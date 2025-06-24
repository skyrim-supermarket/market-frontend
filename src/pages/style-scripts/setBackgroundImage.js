import { useEffect, useState, useRef } from 'react';
import bg0 from '../assets/bg/0.png'
import bg1 from '../assets/bg/1.png'
import bg2 from '../assets/bg/2.png'
import bg3 from '../assets/bg/3.png'
import bg4 from '../assets/bg/4.png'
import bg5 from '../assets/bg/5.png'

function setBackgroundImage() {
  switch(Math.floor(Math.random() * 6)) {
    case 0:
        document.body.style.backgroundImage = `url(${bg0})`;
        break;
    case 1:
        document.body.style.backgroundImage = `url(${bg1})`;
        break;
    case 2:
        document.body.style.backgroundImage = `url(${bg2})`;
        break;
    case 3:
        document.body.style.backgroundImage = `url(${bg3})`;
        break;
    case 4:
        document.body.style.backgroundImage = `url(${bg4})`;
        break;
    case 5:
        document.body.style.backgroundImage = `url(${bg5})`;
        break;

    default:
        break;
    }

    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
}

export default setBackgroundImage;