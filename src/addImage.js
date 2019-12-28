import flowRight from 'lodash/flowRight';
import FireImg from './fire.png';
import './img.scss';

function addImage() {
  const img = document.createElement('img');
  img.alt = 'fire';
  img.width = 100;
  img.src = FireImg;
  document.body.appendChild(img);
}

flowRight([() => alert(3), () => alert(2), () => alert(1)])();
addImage();
