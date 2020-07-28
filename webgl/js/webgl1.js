var init = function () {
  var width = 800;
  height = 600;

  //レンダラーを作成
  var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  antialisa: true});
  renderer.setSize(width, height);

  //シーンを作成
  var scene = new THREE.Scene();

  //カメラを作成
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);

  //箱を作成
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    wireframe: false,
  });
  var box = new THREE.Mesh(geometry, material);
  box.position.set(-1.5, -1.2, -5);
  scene.add(box);

  //箱2を作成
  var geometry2 = new THREE.BoxGeometry(1, 1, 1);
  var material2 = new THREE.MeshPhongMaterial({
    color: 0xffa500,
    wireframe: true,
  });
  var box2 = new THREE.Mesh(geometry2, material2);
  box2.position.set(-1.5, 0, -5);
  scene.add(box2);

  //角柱～円柱
  var cylinderGeometry = new THREE.CylinderGeometry(0.3, 0.5, 1, 8);
  //上の底面の半径、下の底面の半径、高さ、何角柱か
  var cylinderMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    wireframe: false,
  });
  var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinder.position.set(0, 0, -5);
  scene.add(cylinder);

  //角柱～円柱2
  var cylinderGeometry2 = new THREE.CylinderGeometry(0, 0.5, 1, 8);
  //上の底面の半径、下の底面の半径、高さ、何角柱か
  var cylinderMaterial2 = new THREE.MeshToonMaterial({
    color: 0xff1493,
    wireframe: true,
  });
  var cylinder2 = new THREE.Mesh(cylinderGeometry2, cylinderMaterial2);
  cylinder2.position.set(0, -1.2, -5);
  scene.add(cylinder2);

  //球
  var sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  //半径、垂直方向の分割数、水平方向の分割数
  var sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: true,
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(1.5, 1.2, -5);
  scene.add(sphere);

  //ドーナツ
  var torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 6, 12);
  //半径、ドーナツの太さ、ドーナツのチューブ方向の分割数、水平方向の分割数
  var torusMaterial = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    wireframe: true,
  });
  var torus = new THREE.Mesh(torusGeometry, torusMaterial);
  torus.position.set(-1.5, 1.2, -5);
  scene.add(torus);

  //ドーナツ2
  var torusGeometry2 = new THREE.TorusGeometry(0.5, 0.2, 6, 12);
  //半径、ドーナツの太さ、ドーナツのチューブ方向の分割数、水平方向の分割数
  var torusMaterial2 = new THREE.MeshNormalMaterial({ wireframe: false });
  var torus2 = new THREE.Mesh(torusGeometry2, torusMaterial2);
  torus2.position.set(2, 0, -6.5);
  scene.add(torus2);

  //くねくね
  var torusKnotGeometry = new THREE.TorusKnotGeometry(1.5, 0.3, 20, 6, 3, 2);
  //大きさ、太さ、くねくねの方向に対しての分割
  //方向に対して何分割するか、残りの二つの数字を変えると形が変わる
  var torusKnotMaterial = new THREE.MeshPhongMaterial({
    color: 0xff00ff,
    wireframe: true,
  });
  var torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
  torusKnot.position.set(4.5, -3.8, -15);
  scene.add(torusKnot);

  //くねくね2
  var torusKnotGeometry2 = new THREE.TorusKnotGeometry(1.5, 0.3, 20, 6, 3, 2);
  //大きさ、太さ、くねくねの方向に対しての分割
  //方向に対して何分割するか、残りの二つの数字を変えると形が変わる
  var torusKnotMaterial2 = new THREE.MeshPhongMaterial({
    color: 0xafeeee,
    wireframe: false,
  });
  var torusKnot2 = new THREE.Mesh(torusKnotGeometry2, torusKnotMaterial2);
  torusKnot2.position.set(0, 4.2, -17);
  scene.add(torusKnot2);

  //ルービックキューブ
  var GameCubeGeometry = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1);
  var GameCubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff4500,
    wireframe: true,
  });
  var GameCube = new THREE.Mesh(GameCubeGeometry, GameCubeMaterial);
  GameCube.position.set(0, 0, -5);
  scene.add(GameCube);

  //ルービックキューブ2
  var GameCubeGeometry2 = new THREE.CubeGeometry(200, 200, 200, 5, 5, 5);
  var GameCubeMaterial2 = new THREE.MeshBasicMaterial({
    color: 0x7fffd4,
    wireframe: true,
  });
  var GameCube2 = new THREE.Mesh(GameCubeGeometry2, GameCubeMaterial2);
  GameCube.position.set(0, 0, -5);
  scene.add(GameCube2);

  //平行光源
  var directionalLight = new THREE.DirectionalLight(0xaaffff);
  directionalLight.position.set(1, 1, 1);
  //シーンに追加
  scene.add(directionalLight);

  //平行光源2
  var directionalLight2 = new THREE.DirectionalLight(0xffaaff);
  directionalLight2.position.set(-1, 1, 1);
  scene.add(directionalLight2);

  //初回実行
  var update = function () {
    requestAnimationFrame(update);

    //箱を回転させる
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    box2.rotation.x -= 0.01;
    box2.rotation.y -= 0.01;

    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.02;
    cylinder.rotation.z -= 0.01;

    cylinder2.rotation.x -= 0.01;
    cylinder2.rotation.y += 0.02;
    cylinder2.rotation.z -= 0.01;

    sphere.rotation.x += 0.02;
    sphere.rotation.y -= 0.02;
    sphere.rotation.z += 0.02;

    torus.rotation.x -= 0.01;
    torus.rotation.y -= 0.01;

    torus2.rotation.x += 0.01;
    torus2.rotation.y -= 0.01;

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;

    torusKnot2.rotation.x -= 0.01;
    torusKnot2.rotation.y += 0.01;

    GameCube.rotation.x -= 0.01;
    GameCube.rotation.y += 0.01;

    GameCube2.rotation.x += 0.001;
    GameCube2.rotation.y -= 0.001;

    renderer.render(scene, camera);
  };
  update();
};
window.addEventListener("DOMContentLoaded", init);