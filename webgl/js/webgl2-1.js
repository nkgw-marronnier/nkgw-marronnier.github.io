var init = function () {
  var width = 800,
    height = 600;

  // レンダラーを作成
  var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    antialisa: true,
  });
  renderer.setSize(width, height);

  // シーンを作成
  var scene = new THREE.Scene();

  // カメラを作成
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(0, 0, 5);

  // テクスチャー読み込み
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load("/webgl/texture/cit.png");
  var mat = new THREE.MeshPhongMaterial();
  mat.map = texture;

  // 円錐?を作成
  var cylinderGeometry = new THREE.CylinderGeometry(0.3, 0.5, 1, 8);
  var cylinder = new THREE.Mesh(cylinderGeometry, mat);
  cylinder.position.set(0, 0, -5);
  scene.add(cylinder);

  //ドーナツ
  var torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 6, 12);
  var torus = new THREE.Mesh(torusGeometry, mat);
  torus.position.set(2, 0, -6.5);
  scene.add(torus);

  //長方体
  var GameCubeGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
  var GameCube = new THREE.Mesh(GameCubeGeometry, mat);
  GameCube.position.set(-2, 0, -5);
  scene.add(GameCube);

  //球
  var sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var sphere = new THREE.Mesh(sphereGeometry, mat);
  sphere.position.set(-4, 0, -5);
  scene.add(sphere);

  //くねくね
  var torusKnotGeometry = new THREE.TorusKnotGeometry(1.5, 0.3, 20, 6, 3, 2);
  var torusKnot = new THREE.Mesh(torusKnotGeometry, mat);
  torusKnot.position.set(9, 0, -20);
  scene.add(torusKnot);

  //平行光源
  var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);

  //初回実行
  var update = function () {
    requestAnimationFrame(update);

    //図形を回転させる
    GameCube.rotation.y += 0.01;
    GameCube.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;
    cylinder.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    torusKnot.rotation.x += 0.01;

    renderer.render(scene, camera);
  };
  update();
};
window.addEventListener("DOMContentLoaded", init);
