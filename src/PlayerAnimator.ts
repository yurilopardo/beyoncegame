import Phaser from 'phaser';
import { PlayerController } from './PlayerController';
// Provisional pixel poses share a 48×64 cell and the feet pivot (24,60).
export function makePlayerTextures(scene:Phaser.Scene) {
  for(const state of ['idle','run','air','dash','victory']) for(let frame=0;frame<8;frame++) {
    const g=scene.make.graphics({x:0,y:0});
    const step=state==='run'?Math.round(Math.sin(frame*Math.PI/4)*5):0;
    const bob=state==='idle'?Math.round(Math.sin(frame*Math.PI/4)):0;
    const raised=state==='air'||state==='victory';
    const rect=(c:number,x:number,y:number,w:number,h:number)=>{g.fillStyle(c);g.fillRect(x,y+bob,w,h);};
    rect(0x39251e,15,8,19,28); rect(0x735035,13,12,5,23);rect(0xb57a42,14,9,5,17);
    rect(0xc78b66,21,13,12,13);rect(0xe0a17b,29,16,5,6);rect(0x23111f,30,16,2,2);
    rect(0xc78b66,24,25,5,4);rect(0xff4fa0,20,29,12,14);rect(0xf2a6c8,22,29,3,10);
    rect(0xc78b66,18,30,4,raised?-14:12);rect(0xc78b66,32,30,4,raised?-10:9);
    rect(0xff4fa0,19,41,14,6);rect(0xc78b66,20,46,5,10-step);rect(0xc78b66,28,46,5,10+step);
    rect(0xf2a6c8,19,53-step,7,7);rect(0xf2a6c8,28,53+step,7,7);
    if(state==='dash'){rect(0xff4fa0,2,34,10,2);rect(0xf2a6c8,5,40,8,2);}
    rect(0xf4c95d,32,24,2,3);
    g.generateTexture(`${state}${frame}`,48,64);g.destroy();
  }
}
export class PlayerAnimator {
  constructor(private controller:PlayerController){}
  update(won=false) {
    const c=this.controller;
    const state=won?'victory':c.dashing?'dash':!c.body.blocked.down?'air':Math.abs(c.body.velocity.x)>12?'run':'idle';
    const frame=Math.floor(c.clock/(state==='run'?83:125))%8;
    c.sprite.setTexture(`${state}${frame}`).setFlipX(c.facing<0);
  }
}
