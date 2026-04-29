import { Howl } from 'howler';
const tone=(_f:number,_d=0.07)=>`data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTAAAAAA`; // tiny placeholder
export const sfx={
click:new Howl({src:[tone(440)],volume:0.2}),cash:new Howl({src:[tone(660)],volume:0.2}),wrench:new Howl({src:[tone(220)],volume:0.2}),fail:new Howl({src:[tone(120)],volume:0.2}),angry:new Howl({src:[tone(90)],volume:0.2}),
ambient:new Howl({src:[tone(160,1)],loop:true,volume:0.1})
};
