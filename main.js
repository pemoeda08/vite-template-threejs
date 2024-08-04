import './style.css'
import { Experience } from './experience'

const canvasEl = document.querySelector("#canvas");

const experience = new Experience(canvasEl);
experience.start();