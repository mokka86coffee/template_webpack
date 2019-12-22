import FireImg from './fire.png';
import './img.scss';

export default function addImage() {
  const img = document.createElement('img');
  img.alt = 'fire';
  img.width = 100;
  img.src = FireImg;
  document.body.appendChild(img);
}