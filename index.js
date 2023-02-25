//import './style.css';

//import * as THREE from 'https://unpkg.com/three@0.138.0/build/three.module.js';
//import * as THREE from 'three';
import * as THREE from './three/build/three.module.js';
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//import * as dat from "dat.gui";
//import { LineSegments, Vector3, WireframeGeometry } from "https://unpkg.com/three@0.138.0/build/three.module.js";
//import { LineSegments, Vector3, WireframeGeometry } from "https://unpkg.com/three@0.138.0/build/three.module.js";
import { LineSegments, Vector3, WireframeGeometry } from "./three/build/three.module.js";
//import { LineSegments, Vector3, WireframeGeometry } from "three";

//import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFLoader } from "./three/examples/jsm/loaders/GLTFLoader.js";
//import { GLTFLoader } from "https://unpkg.com/three@0.138.0/examples/jsm/loaders/GLTFLoader.js";
//import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';


let scrollPercent = 0;

let gui, canvas, scene, sizes, renderer, clock, css3drenderer; 

//Loaders
let fileloader, gltfLoader, imgLoader;

//################## DEBUG ########################

let gridHelper, controls;


//#################### OBJECTS ######################
let camera;
let light;
let laptop;
let toriigate;
let campfire;
let backpack;

let light1;
let light2;
let lightcamp;

let user;

let scrollLevel = 0;
let scrollTime =0;

//############ IMAGES / TEXTURE / LOADED  ###############
let starImg;
let dev = false;


//XXXXXXXXXXXXXXXXXXX MAIN XXXXXXXXXXXXXXXXXXXX
function main() {
  init();
  loadeFiles();
  createObjects();
  createDebugOjects();
  tick();
}

//XXXXXXXXXXXXXXXXXX Init XXXXXXXXXXXXXXXXXX
function init() {
  canvas = document.querySelector("canvas.webgl");

  scene = new THREE.Scene();

  fileloader = new THREE.FileLoader();
  gltfLoader = new GLTFLoader();
  imgLoader = new THREE.TextureLoader();

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });

  sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x757575);

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  clock = new THREE.Clock();

  /*document.body.onscroll = () => {
    //calculate the current scroll progress as a percentage
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100
    ;(document.getElementById('scrollProgress')).innerText =
        'Scroll Progress : ' + scrollPercent.toFixed(2)
}*/

//document.addEventListener('wheel', (event) => {
//document.getElementById("bg").onwheel = (event) => {
document.body.onwheel = (event) => {
  if(scrollTime <= 0){
    if(scrollLevel<4 ||( scrollLevel==4 && event.deltaY<0))
      scrollTime = 2;
    scrollLevel += event.deltaY/100;
    if(scrollLevel<0) scrollLevel=0;
    if(scrollLevel>=4) scrollLevel=4;
  }
  
};
//});

/*
css3drenderer = new CSS3DRenderer();
css3drenderer.setSize( window.innerWidth, window.innerHeight );


        document.getElementById( 'container' ).appendChild( renderer.domElement );
        const objectCSS = new CSS3DObject( document.getElementById( 'user' ) );
        objectCSS.position.x = 0;
					objectCSS.position.y = 0;
					objectCSS.position.z = 0;
        scene.add( objectCSS );
				*/
  // loadeFiles();

  document.getElementById("next").onclick = (event) =>{
    if(scrollTime <= 0){
      if(scrollLevel<4 ||( scrollLevel==4 && 1<0))
        scrollTime = 2;
      scrollLevel += 1;
      if(scrollLevel<0) scrollLevel=0;
      if(scrollLevel>=4) scrollLevel=4;
    }
  };

}


//XXXXXXXXXXXXXXXXXX Loade files XXXXXXXXXXXXXXXXXX
function loadeFiles() {
  gltfLoader.load(
    "./assets/laptop5.gltf",
    (gltf) => {
      laptop = gltf.scene;
      laptop.position.set(0, 0, 0);
      
      rotLaptopScreenPercentage(0);
      scene.add(laptop);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  gltfLoader.load(
    "./assets/toriigate.gltf",
    (gltf) => {
      toriigate = gltf.scene;
      toriigate.position.set(25, -3, 10);
      toriigate.rotation.set(0,-Math.PI/2*1.2,0);
      toriigate.scale.set(0.7,0.7,0.7)
     // toriigate.scalePercent = new Vector3(0.1,0.1,0.1);
     toriigate.visible = false;
      scene.add(toriigate);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  gltfLoader.load(
    "./assets/campfire2.gltf",
    (gltf) => {
      campfire = gltf.scene;
      campfire.position.set(-8, -8, 20);
      //campfire.rotation.set(0,-Math.PI/2*1.2,0);
      //campfire.scale.set(0.7,0.7,0.7)
     //campfire.visible = false;
      scene.add(campfire);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  
  gltfLoader.load(
    "./assets/bsckpack.gltf",
    (gltf) => {
      backpack = gltf.scene;
      backpack.position.set(-20, -11, -6);
      //campfire.rotation.set(0,-Math.PI/2*1.2,0);
      //campfire.scale.set(0.7,0.7,0.7)
     //campfire.visible = false;
      scene.add(backpack);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );


}


//XXXXXXXXXXXXXXXXXX Create objs XXXXXXXXXXXXXXXXXX
function createObjects() {
  createCamera();

  //controls = new OrbitControls(camera, canvas);
  //controls.enableDamping = true;

  

  light = new THREE.AmbientLight(0xffffff);
  light1 = new THREE.PointLight(0xffffff); //.AmbientLight(0xffffff);

  light2 = new THREE.PointLight(0xffffff); //.AmbientLight(0xffffff);
  light2.castShadow = true;
  light2.position.set(10,0,0);
  light2.intensity = 0.5;

  lightcamp = new THREE.PointLight(0xFF500E); //.AmbientLight(0xffffff);
  //light2.castShadow = true;
  lightcamp.position.set(-8,-7,20);
  lightcamp.visible =false;
  //light2.intensity = 0.5;
/*
  //Set up shadow properties for the light
light2.shadow.mapSize.width = 512; // default
light2.shadow.mapSize.height = 512; // default
light2.shadow.camera.near = 0.5; // default
light2.shadow.camera.far = 500; // default*/
  
  //sphereCreate();

  scene.add(camera, light, light1,light2,lightcamp);

 //  createDebugOjects();
}

//XXXXXXXXXXXXXXXXXX Create debug XXXXXXXXXXXXXXXXXX
function createDebugOjects() {
 // gui = new dat.GUI();
  //gridHelper = new THREE.GridHelper(50, 50);
 // scene.add(gridHelper);
  // gui.add(params, "anim");
  //gui.add(galparams, "paths").step(1);
  //gui.add(galparams, "countInOnPath").step(1);
 // gui.add(galparams, "turnangle");
  //gui.add(galparams, "radius");

  //tick();
}



/*
 *
 * HHHHHHHHHHHHHHHHHHHH Functions HHHHHHHHHHHHHHHHHHHHHH
 *
 */
function createCamera() {
  camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
  );
  camera.position.x = -3;
  camera.position.y = 5;
  camera.position.z = 0;
  
}


/* Liner Interpolation
 * lerp(min, max, ratio)
 * eg,
 * lerp(20, 60, .5)) = 40
 * lerp(-20, 60, .5)) = 20
 * lerp(20, 60, .75)) = 50
 * lerp(-20, -10, .1)) = -.19
 */
function lerp(x, y, a) {
  return (1 - a) * x + a * y
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
  let num1 = (scrollPercent - start) / (end - start);
  if(num1>1) num1=1;
  return num1
}

const animationScripts = [];
const animationLevels = [];

//########### Animations #########
animationLevels.push({
  level: 0,
  func: (delta) => {

    rotLaptopScreenPercentage(0);

    if(laptop)
      camera.lookAt(laptop.position);
    document.getElementById("user").classList.remove("fade-in");
    document.getElementById("user").classList.add("invizible");
  }
});


animationLevels.push({
  level: 1,
  func: (delta) => {
    rotLaptopScreenPercentage(lerp(0, 100, delta));

    if(laptop) camera.lookAt(new Vector3(laptop.position.x,laptop.position.y+lerp(0, 2,delta),laptop.position.z));
    camera.position.x = lerp(-3, -1, delta);
    camera.position.y = lerp(5, 2.2, delta);
    camera.position.z = 0;
      if(delta>0.9){
        document.getElementById("user").classList.add("fade-in");
    document.getElementById("user").classList.remove("invizible");
      }
      document.getElementById("torii").classList.remove("fade-in-right");
      document.getElementById("torii").classList.add("invizible");
  }
});

animationLevels.push({
  level: 2,
  func: (delta) => {
    camera.position.x = lerp(-1, 10, delta);
    camera.position.y = 2.2;
    camera.position.z = 0;
    if(laptop)
    camera.lookAt(new Vector3(camera.position.x+1,laptop.position.y+2,laptop.position.z));
    
    if(toriigate){
      if(delta>0.2){
        toriigate.visible = true;
      }else{
        toriigate.visible = false;
      }
    }


    document.getElementById("user").classList.add("invizible");
    document.getElementById("user").classList.remove("fade-in");

    document.getElementById("torii").classList.add("fade-in-right");
    document.getElementById("torii").classList.remove("invizible");

    document.getElementById("campfire").classList.remove("fade-in-right");
    document.getElementById("campfire").classList.add("invizible");

    //if(scrollPercent>start+2 && scrollPercent<end-2){
     
    //}else{
      //document.getElementById("user").classList.add("invizible");
     // document.getElementById("user").classList.remove("fade-in");
      
      //document.getElementById("user").classList.add("invizible");
      //document.getElementById("user").classList.remove("fade-in");
    //}

  }
});
let camlookat = new Vector3(15,2.2,0);
animationLevels.push({
  level: 3,
  func: (delta) => {
    document.getElementById("torii").classList.add("invizible");
    document.getElementById("torii").classList.remove("fade-in-right");
    document.getElementById("campfire").classList.add("fade-in-right");
    document.getElementById("campfire").classList.remove("invizible");
    document.getElementById("backpack").classList.remove("fade-in-right");
    document.getElementById("backpack").classList.add("invizible");
    camera.position.x = lerp(10, -3, delta);
    camera.position.y = lerp(2.2, -2, delta);
    camera.position.z = lerp(0, 10, delta);
    //camera.rotation.x =  lerp(Math.PI, Math.PI/180*185 , scalePercent(start, end-2));
  //  camera.rotation.x =  lerp(-Math.PI/2, 0 , scalePercent(start, end-2));
  // camera.rotation.set(0,lerp(-Math.PI/2,  -Math.PI, scalePercent(start, end-2)),0);
  camlookat.x = lerp(15, -3, delta);
  camlookat.y = lerp(1.2, -8, delta);
  camlookat.z = lerp(0, 20, delta);
  camera.lookAt(camlookat);
   // if(laptop)
    //camera.lookAt(new Vector3(camera.position.x+1,laptop.position.y+2,laptop.position.z));
    if(lightcamp){
      if(delta>0.2){
        lightcamp.visible = true;
      }else{
        lightcamp.visible = false;
      }
    }

  }
});

animationLevels.push({
  level: 4,
  func: (delta,deltatime) => {

    lightcamp.visible = false;
    document.getElementById("campfire").classList.remove("fade-in-right");
    document.getElementById("campfire").classList.add("invizible");
    document.getElementById("backpack").classList.add("fade-in-right");
      document.getElementById("backpack").classList.remove("invizible");
    camera.position.x = lerp(-3, -15, delta);
    camera.position.y = lerp(-2, -9, delta);
    camera.position.z = lerp(10, -6, delta);
    //camera.rotation.x =  lerp(Math.PI, Math.PI/180*185 , scalePercent(start, end-2));
  //  camera.rotation.x =  lerp(-Math.PI/2, 0 , scalePercent(start, end-2));
  // camera.rotation.set(0,lerp(-Math.PI/2,  -Math.PI, scalePercent(start, end-2)),0);
  camlookat.x = lerp(-3, -20, delta);
  camlookat.y = lerp(-8, -11, delta);
  camlookat.z = lerp(20, -4, delta);
  camera.lookAt(camlookat);

  backpack.rotation.y += deltatime;

  }
});

animationLevels.push({
  level: 5,
  func: (delta) => {
    
  }
});

animationLevels.push({
  level: 6,
  func: (delta) => {
    
  }
});


animationScripts.push({
  start: 0,
  end: 10,
  func: (start, end) => {
      rotLaptopScreenPercentage (lerp(0, 100, scalePercent(start, end-2)));
      //console.log(camera.position.x + " " + camera.position.y)
  },
});

animationScripts.push({
  start: 0,
  end: 10,
  func: (start, end) => {
      if(laptop)
        camera.lookAt(new Vector3(laptop.position.x,laptop.position.y+lerp(0, 2, scalePercent(start, end-2)),laptop.position.z));
        camera.position.x = lerp(-3, -1, scalePercent(start, end-2));
        camera.position.y = lerp(5, 2.2, scalePercent(start, end-2));
        camera.position.z = 0;
  },
});

animationScripts.push({
  start: 12,
  end: 16,
  func: (start, end) => {
       camera.position.x = lerp(-1, 10, scalePercent(start, end-2));
        camera.position.y = 2.2;
        camera.position.z = 0;
        if(laptop)
        camera.lookAt(new Vector3(camera.position.x+1,laptop.position.y+2,laptop.position.z));
        
  },
});


animationScripts.push({
  start: 10,
  end: 14,
  func: (start, end) => {
    if(toriigate){

      if(scrollPercent>12){
        toriigate.visible = true;
      }else{
        toriigate.visible = false;
      }

    }
       
       
  },
});


animationScripts.push({
  start: 7,
  end: 14,
  func: (start, end) => {
    if(scrollPercent>start+2 && scrollPercent<end-2){
      document.getElementById("user").classList.add("fade-in");
      document.getElementById("user").classList.remove("invizible");
    }else{
      
      document.getElementById("user").classList.add("invizible");
      document.getElementById("user").classList.remove("fade-in");
    }
       
  },
});

animationScripts.push({
  start: 12,
  end: 20,
  func: (start, end) => {
    if(scrollPercent>start+2 && scrollPercent<end-2){
      document.getElementById("torii").classList.add("fade-in-right");
      document.getElementById("torii").classList.remove("invizible");
    }else{
      
      document.getElementById("torii").classList.add("invizible");
      document.getElementById("torii").classList.remove("fade-in-right");
    }
       
  },
});

animationScripts.push({
  start: 22,
  end: 30,
  func: (start, end) => {
    if(scrollPercent>start+2 && scrollPercent<end-2){
      document.getElementById("campfire").classList.add("fade-in-right");
      document.getElementById("campfire").classList.remove("invizible");
    }else{
      
      document.getElementById("campfire").classList.add("invizible");
      document.getElementById("campfire").classList.remove("fade-in-right");
    }
       
  },
});

animationScripts.push({
  start: 30,
  end: 40,
  func: (start, end) => {
    if(scrollPercent>start+2 && scrollPercent<end-2){
      document.getElementById("backpack").classList.add("fade-in-right");
      document.getElementById("backpack").classList.remove("invizible");
    }else{
      
      document.getElementById("backpack").classList.add("invizible");
      document.getElementById("backpack").classList.remove("fade-in-right");
    }
       
  },
});


animationScripts.push({
  start: 16,
  end: 22,
  func: (start, end) => {
      if(laptop);
       // laptop.
       // camera.position.x = lerp(-2, 10, scalePercent(start, end-5));
       // camera.position.y = 2;
       // camera.position.z = 0;
  },
});


animationScripts.push({
  start: 18,
  end: 26,
  func: (start, end) => {
       camera.position.x = lerp(10, -3, scalePercent(start, end-2));
        camera.position.y = lerp(2.2, -2, scalePercent(start, end-2));
        camera.position.z = lerp(0, 10, scalePercent(start, end-2));
        //camera.rotation.x =  lerp(Math.PI, Math.PI/180*185 , scalePercent(start, end-2));
      //  camera.rotation.x =  lerp(-Math.PI/2, 0 , scalePercent(start, end-2));
      // camera.rotation.set(0,lerp(-Math.PI/2,  -Math.PI, scalePercent(start, end-2)),0);
      camlookat.x = lerp(15, -3, scalePercent(start, end-2));
      camlookat.y = lerp(1.2, -8, scalePercent(start, end-2));
      camlookat.z = lerp(0, 20, scalePercent(start, end-2));
      camera.lookAt(camlookat);
       // if(laptop)
        //camera.lookAt(new Vector3(camera.position.x+1,laptop.position.y+2,laptop.position.z));
        if(lightcamp&&scrollPercent>19){
          lightcamp.visible = true;
        }else{
          lightcamp.visible = false;
        }
  },
});
animationScripts.push({
  start: 28,
  end: 34,
  func: (start, end) => {
       camera.position.x = lerp(-3, -15, scalePercent(start, end-2));
        camera.position.y = lerp(-2, -9, scalePercent(start, end-2));
        camera.position.z = lerp(10, -6, scalePercent(start, end-2));
        //camera.rotation.x =  lerp(Math.PI, Math.PI/180*185 , scalePercent(start, end-2));
      //  camera.rotation.x =  lerp(-Math.PI/2, 0 , scalePercent(start, end-2));
      // camera.rotation.set(0,lerp(-Math.PI/2,  -Math.PI, scalePercent(start, end-2)),0);
      camlookat.x = lerp(-3, -20, scalePercent(start, end-2));
      camlookat.y = lerp(-8, -11, scalePercent(start, end-2));
      camlookat.z = lerp(20, -4, scalePercent(start, end-2));
      camera.lookAt(camlookat);
       // if(laptop)
        //camera.lookAt(new Vector3(camera.position.x+1,laptop.position.y+2,laptop.position.z));
       
  },
});



function playScrollAnimations() {
  animationScripts.forEach((a) => {
      if (scrollPercent >= a.start && scrollPercent < a.end) {
          a.func(a.start,a.end)
      }
  })
}

function ScrollAnim( deltaTime){
  animationLevels.forEach((a) => {
    if(scrollLevel == a.level){
      a.func(getScrollDelta(),deltaTime);
    }
  })
}

function getScrollDelta(){
  if(scrollTime<=0) return 1;
  return 1-scrollTime/2;
}


//Laptop screen rotation

function rotLaptopScreenPercentage(percent) {
  let rot = Math.PI/180*(90-percent);
  if(laptop){
    laptop.getObjectByName("backpanel").rotation.z=rot;
      laptop.getObjectByName("screen").rotation.z=rot;
  }
      
}

//XXXXXXXXXXXXXXXXXX GameLoop XXXXXXXXXXXXXXXXXX

const tick = () => {
  const deltaTime = clock.getDelta();

 // playScrollAnimations();
 ScrollAnim(deltaTime);
  scrollTime -= deltaTime;
  if(dev){
    document.getElementById('deltatime').innerText = 'Scrolltime : ' + scrollTime.toFixed(3);
  document.getElementById('scrollProgress').innerText = 'Level : ' + scrollLevel.toFixed(1);
  document.getElementById('deltatime').style.opacity = 1;
    document.getElementById('scrollProgress').style.opacity = 1;
  }else{
    document.getElementById('deltatime').style.opacity = 0;
    document.getElementById('scrollProgress').style.opacity = 0;

  }
  
  //controls.update();

  renderer.render(scene, camera);
  //css3drenderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
window.scrollTo({ top: 0, behavior: 'smooth' })
main();



