import Phaser from 'phaser';
import config from '../gameplay.json';
const p = config.player;
export class PlayerController {
  facing = 1;
  dashing = false;
  clock = 0;
  private lastGround = -Infinity;
  private bufferedJump = -Infinity;
  private dashStarted = -Infinity;
  private airDashes = 0;
  private jumpConsumed = false;
  readonly keys: Record<string, Phaser.Input.Keyboard.Key>;
  constructor(readonly sprite: Phaser.Physics.Arcade.Sprite, scene: Phaser.Scene) {
    this.keys = scene.input.keyboard!.addKeys('A,D,LEFT,RIGHT,SPACE,SHIFT') as typeof this.keys;
    scene.input.keyboard!.addCapture(['SPACE','LEFT','RIGHT','UP','DOWN']);
    sprite.body!.setSize(p.body.width,p.body.height);
    (sprite.body as Phaser.Physics.Arcade.Body).setOffset(15,20).setMaxVelocity(p.dash.speed,p.fallMaxSpeed);
  }
  get body() { return this.sprite.body as Phaser.Physics.Arcade.Body; }
  get dashReady() { return this.clock-this.dashStarted >= p.dash.cooldownFromStartMs; }
  update(dt: number) {
    this.clock += dt;
    const b=this.body, k=this.keys;
    const grounded=b.blocked.down;
    if(grounded) { this.lastGround=this.clock; this.airDashes=0; if(b.velocity.y>=0) this.jumpConsumed=false; }
    if(Phaser.Input.Keyboard.JustDown(k.SPACE)) this.bufferedJump=this.clock;
    const dir=Number(k.D.isDown||k.RIGHT.isDown)-Number(k.A.isDown||k.LEFT.isDown);
    if(dir) this.facing=dir;
    if(Phaser.Input.Keyboard.JustDown(k.SHIFT)&&this.dashReady&&(grounded||this.airDashes<p.dash.airUsesPerLanding)) {
      this.dashing=true; this.dashStarted=this.clock;
      if(!grounded) this.airDashes++;
      b.setAllowGravity(false).setAccelerationX(0).setVelocity(this.facing*p.dash.speed,0);
    }
    if(this.dashing) {
      if(this.clock-this.dashStarted>=p.dash.durationMs||b.blocked.left||b.blocked.right) {
        this.dashing=false; b.setAllowGravity(true).setVelocityY(p.dash.verticalSpeedOnExit);
      } else return;
    }
    if(dir) b.setAccelerationX(dir*(grounded?p.groundAcceleration:p.airAcceleration));
    else { b.setAccelerationX(0); b.setVelocityX(Math.sign(b.velocity.x)*Math.max(0,Math.abs(b.velocity.x)-p.groundDeceleration*dt/1000)); }
    b.velocity.x=Phaser.Math.Clamp(b.velocity.x,-p.runMaxSpeed,p.runMaxSpeed);
    if(!this.jumpConsumed&&this.clock-this.lastGround<=p.coyoteTimeMs&&this.clock-this.bufferedJump<=p.jumpBufferMs) {
      b.setVelocityY(p.jumpVelocity); this.jumpConsumed=true; this.lastGround=-Infinity; this.bufferedJump=-Infinity;
    }
    if(!k.SPACE.isDown&&b.velocity.y<p.jumpReleaseVelocityClamp) b.setVelocityY(p.jumpReleaseVelocityClamp);
  }
  reset(x:number,y:number) {
    this.sprite.setPosition(x,y-28); this.body.reset(x,y-28);
    this.body.setVelocity(0,0).setAcceleration(0,0).setAllowGravity(true);
    this.dashing=false; this.lastGround=-Infinity; this.bufferedJump=-Infinity; this.jumpConsumed=false; this.airDashes=0; this.dashStarted=-Infinity;
  }
}
