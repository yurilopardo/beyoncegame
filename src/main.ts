import Phaser from 'phaser';
import config from '../gameplay.json';
import level from '../levels/prototype.json';
import {PlayerController} from './PlayerController';
import {PlayerAnimator,makePlayerTextures} from './PlayerAnimator';
import './style.css';
const message=document.querySelector<HTMLElement>('#message')!;
const dash=document.querySelector<HTMLElement>('#dash')!;
class LevelScene extends Phaser.Scene {
  controller!:PlayerController;
  animator!:PlayerAnimator;
  paused=false;
  won=false;
  overlay!:Phaser.GameObjects.Container;
  shadow!:Phaser.GameObjects.Ellipse;
  constructor(){super('level');}
  create(){
    makePlayerTextures(this);
    this.cameras.main.setBackgroundColor('#08070b');
    this.physics.world.setBounds(0,-200,level.width,800);
    const bg=this.add.graphics().setScrollFactor(.25);
    bg.fillStyle(0x17101b);bg.fillRect(0,110,1900,130);
    for(let x=0;x<1900;x+=96){bg.fillStyle(0x231725);bg.fillRect(x,75,3,150);bg.fillRect(x,75,80,3);bg.lineStyle(1,0x322035);bg.strokeRect(x+12,104,56,100);}
    for(let x=20;x<1900;x+=160){bg.fillStyle(0xf2a6c8,.035);bg.fillTriangle(x,20,x-60,224,x+100,224);bg.fillStyle(0xf2a6c8);bg.fillRect(x-3,16,12,4);}
    this.add.text(34,94,'THE REHEARSAL',{fontFamily:'monospace',fontSize:'9px',color:'#6d455f',letterSpacing:3});
    this.add.text(34,110,'OWN THE\nSPOTLIGHT.',{fontFamily:'Arial',fontStyle:'bold',fontSize:'23px',color:'#b77896',lineSpacing:-4});
    const solids=this.physics.add.staticGroup();
    for(const p of level.platforms){
      const block=this.add.rectangle(p.x,p.y,p.width,p.height,0x302630).setOrigin(0);
      this.physics.add.existing(block,true);solids.add(block);
      this.add.rectangle(p.x,p.y,p.width,2,0xf2a6c8).setOrigin(0);
      for(let x=p.x+8;x<p.x+p.width;x+=16)this.add.rectangle(x,p.y+8,7,2,0x483341).setOrigin(0);
    }
    for(const gap of level.gaps){this.add.text(gap.x+gap.width/2,248,`${gap.width} px`,{fontFamily:'monospace',fontSize:'7px',color:'#ff4fa0'}).setOrigin(.5);}
    this.add.text(270,165,'01 / SALTE',{fontFamily:'monospace',fontSize:'8px',color:'#f2a6c8'});
    this.add.text(628,165,'02 / VÁ MAIS LONGE',{fontFamily:'monospace',fontSize:'8px',color:'#f2a6c8'});
    this.add.text(948,112,'03 / EXPERIMENTE O DASH',{fontFamily:'monospace',fontSize:'8px',color:'#f2a6c8'});
    this.add.rectangle(1340,155,68,138,0xff4fa0,.07);this.add.rectangle(1340,224,66,2,0xff4fa0);
    this.add.text(1340,115,'SEU PALCO',{fontFamily:'monospace',fontSize:'10px',color:'#f2a6c8'}).setOrigin(.5);
    this.shadow=this.add.ellipse(64,223,24,4,0x000000,.65);
    const player=this.physics.add.sprite(64,196,'idle0');
    this.controller=new PlayerController(player,this);this.animator=new PlayerAnimator(this.controller);
    this.physics.add.collider(player,solids);
    this.cameras.main.setBounds(0,0,level.width,270).startFollow(player,true,.12,1).setDeadzone(96,270).setFollowOffset(-32,0).setRoundPixels(true);
    const shade=this.add.rectangle(240,135,480,270,0x050505,.86);
    const title=this.add.text(240,111,'ENSAIO EM PAUSA',{fontFamily:'Arial',fontStyle:'bold',fontSize:'22px',color:'#f2a6c8'}).setOrigin(.5);
    const hint=this.add.text(240,150,'ESC ou PAUSAR para continuar',{fontFamily:'monospace',fontSize:'10px',color:'#f6eef3'}).setOrigin(.5);
    this.overlay=this.add.container(0,0,[shade,title,hint]).setScrollFactor(0).setDepth(100).setVisible(false);
    this.input.keyboard!.on('keydown-ESC',()=>this.setPause(!this.paused));
    this.input.keyboard!.on('keydown-R',()=>this.restart());
    this.game.events.on(Phaser.Core.Events.BLUR,()=>this.setPause(true));
    document.querySelector('#pause')!.addEventListener('click',()=>this.setPause(!this.paused));
    document.querySelector('#restart')!.addEventListener('click',()=>this.restart());
    // Read-only development telemetry for browser smoke checks.
    Object.defineProperty(window,'queenB',{configurable:true,get:()=>({x:player.x,feet:this.controller.body.bottom,vx:this.controller.body.velocity.x,vy:this.controller.body.velocity.y,grounded:this.controller.body.blocked.down,dashing:this.controller.dashing,paused:this.paused,won:this.won})});
  }
  setPause(value:boolean){this.paused=value;this.overlay.setVisible(value);if(value){this.physics.pause();this.input.keyboard!.resetKeys();}else this.physics.resume();document.querySelector('#pause')!.textContent=value?'CONTINUAR [ESC]':'PAUSAR [ESC]';}
  restart(){this.setPause(false);this.won=false;this.controller.reset(level.spawn.x,level.spawn.y);message.textContent='Novo ensaio. Encontre seu movimento.';}
  update(_time:number,dt:number){
    if(this.paused)return;
    this.controller.update(Math.min(dt,50));this.animator.update(this.won);
    this.shadow.setPosition(this.controller.sprite.x,223).setVisible(this.controller.body.bottom<=225&&!level.gaps.some(g=>this.controller.sprite.x>g.x&&this.controller.sprite.x<g.x+g.width));
    dash.textContent=this.controller.dashReady?'DASH PRONTO ✦':'DASH RECARREGANDO';
    if(this.controller.body.bottom>330||this.controller.sprite.x<8){this.controller.reset(level.spawn.x,level.spawn.y);message.textContent='Faz parte do ensaio. Tente segurar o salto por mais tempo.';}
    if(this.controller.sprite.x>=level.finishX&&!this.won){this.won=true;message.textContent='✦ O palco é seu! Etapa 1 concluída. R para ensaiar de novo.';}
  }
}
const game=new Phaser.Game({type:Phaser.AUTO,parent:'game',width:480,height:270,pixelArt:true,roundPixels:true,antialias:false,physics:{default:'arcade',arcade:{gravity:{x:0,y:config.player.gravity},fps:60,fixedStep:true}},scene:[LevelScene],scale:{mode:Phaser.Scale.NONE}});
function resize(){const width=document.querySelector('#game')!.clientWidth;const scale=width>=480?Math.max(1,Math.min(4,Math.floor(width/480))):width/480;game.canvas.style.width=`${480*scale}px`;game.canvas.style.height=`${270*scale}px`;}
window.addEventListener('resize',resize);game.events.once('ready',resize);resize();
