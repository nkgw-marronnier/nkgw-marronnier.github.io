var init = function () {
  var width = 960,
    height = 540;

  var clock = new THREE.Clock();

  // レンダラーを作成
  var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
    antialisa: true,
  });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;

  // シーンを作成
  var scene = new THREE.Scene();

  // カメラを作成
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 150);
  camera.position.set(0, 0, 30);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvas);

  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 1.0;

  // カメラを轆轤みたいに回転してみる
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

  //FPS確認用
  var stats = new Stats();
  stats.showPanel(0); //0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  //グループを作る
  var round_group = new THREE.Group();
  //3D空間にグループを追加する
  scene.add(round_group);

  var round2_group = new THREE.Group();
  scene.add(round2_group);

  var round3_group = new THREE.Group();
  scene.add(round3_group);

  var round4_group = new THREE.Group();
  scene.add(round4_group);

  var round5_group = new THREE.Group();
  scene.add(round5_group);

  // テクスチャー読み込み
  var textureLoader = new THREE.TextureLoader();
  var texture_earth = textureLoader.load("/webgl/texture/earth.jpg");
  var mat_earth = new THREE.MeshLambertMaterial();
  mat_earth.map = texture_earth;
  var texture = textureLoader.load("/webgl/texture/stone.jpg");
  var mat = new THREE.MeshPhongMaterial();
  mat.map = texture;
  var kawa1_texture = textureLoader.load("/webgl/texture/kawa1.jpg");
  var kawa1_mat = new THREE.MeshLambertMaterial();
  kawa1_mat.map = kawa1_texture;
  var kawa2_texture = textureLoader.load("/webgl/texture/kawa2.jpg");
  var kawa2_mat = new THREE.MeshLambertMaterial();
  kawa2_mat.map = kawa2_texture;
  var minamo_texture = textureLoader.load("/webgl/texture/minamo.jpg");
  var minamo_mat = new THREE.MeshPhongMaterial();
  minamo_mat.map = minamo_texture;
  var ki_texture = textureLoader.load("/webgl/texture/ki.jpg");
  var ki_mat = new THREE.MeshLambertMaterial();
  ki_mat.map = ki_texture;
  var tree_texture = textureLoader.load("/webgl/texture/tree0.png");
  var tree2_texture = textureLoader.load("/webgl/texture/tree1.png");
  var tree3_texture = textureLoader.load("/webgl/texture/tree2.png");
  var tree4_texture = textureLoader.load("/webgl/texture/tree3.png");

  //バンプマップ読み込み
  var bump = textureLoader.load("/webgl/texture/stone-bump.jpg");
  mat.bumpMap = bump;
  mat.bumpscale = 0.2;
  minamo_mat.bumpMap = minamo_texture;
  minamo_mat.bumpscale = 0.01;

  // 地球を作成
  var earthgeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var earth = new THREE.Mesh(earthgeometry, mat_earth);
  earth.receiveShadow = true;
  earth.castShadow = true;
  earth.position.set(0, 0, 0);
  earth.rotation.x = Math.PI / 12;
  scene.add(earth);
  earth.scale.set(2.5, 2.5, 2.5);

  for (let i = 0; i < 8; i++) {
    //立方体
    var cubegeometry = new THREE.BoxGeometry(1, 1, 1);
    var cube = new THREE.Mesh(cubegeometry, mat);
    var radian = (i / 8) * Math.PI * 2;
    cube.position.set(-3.5 * Math.cos(radian), -0.3, -3.5 * Math.sin(radian));
    cube.rotation.set(i, i, i);
    cube.receiveShadow = true;
    cube.castShadow = true;
    round3_group.add(cube);
    cube.scale.set(0.5, 0.5, 0.5);
  }

  for (let i = 0; i < 10; i++) {
    //ドーナツ
    var torusgeometry = new THREE.TorusGeometry(0.5, 0.2, 6, 12);
    var torus = new THREE.Mesh(torusgeometry, mat);
    var radian = (i / 10) * Math.PI * 2;
    torus.position.set(-5.5 * Math.cos(radian), -0.3, -5.5 * Math.sin(radian));
    torus.rotation.set(i, i, i);
    torus.receiveShadow = true;
    torus.castShadow = true;
    round4_group.add(torus);
    torus.scale.set(0.5, 0.5, 0.5);
  }

  //地面を作成
  var planegeometry = new THREE.PlaneGeometry(100, 100);
  var plane = new THREE.Mesh(planegeometry, minamo_mat);
  plane.rotation.x = Math.PI / -2;
  scene.add(plane);
  plane.receiveShadow = true;
  plane.position.set(0, -8, 0);

  //内中側
  for (let i = 0; i < 10; i++) {
    // 顔を作成
    var kaogeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var kao = new THREE.Mesh(kaogeometry, kawa1_mat);
    var radian = (i / 10) * Math.PI * 2;
    kao.position.set(-4.5 * Math.cos(radian), 0.7, -4.5 * Math.sin(radian));
    kao.receiveShadow = true;
    kao.castShadow = true;
    round_group.add(kao);
    kao.scale.set(0.7, 0.7, 0.7);
  }
  for (let i = 0; i < 10; i++) {
    // 胴体を作成
    var doutaigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var doutai = new THREE.Mesh(doutaigeometry, kawa1_mat);
    var radian = (i / 10) * Math.PI * 2;
    doutai.position.set(-4.5 * Math.cos(radian), 0, -4.5 * Math.sin(radian));
    doutai.receiveShadow = true;
    doutai.castShadow = true;
    round_group.add(doutai);
    doutai.scale.set(0.7, 1, 0.7);
  }
  for (let i = 0; i < 10; i++) {
    // 左耳を作成
    var hidarimimigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var hidarimimi = new THREE.Mesh(hidarimimigeometry, kawa1_mat);
    var radian = (i / 10) * Math.PI * 2;
    hidarimimi.position.set(
      -4.75 * Math.cos(radian),
      1,
      -4.75 * Math.sin(radian)
    );
    hidarimimi.receiveShadow = true;
    hidarimimi.castShadow = true;
    round_group.add(hidarimimi);
    hidarimimi.scale.set(0.2, 0.2, 0.2);
  }
  for (let i = 0; i < 10; i++) {
    // 右耳を作成
    var migimimigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var migimimi = new THREE.Mesh(migimimigeometry, kawa1_mat);
    var radian = (i / 10) * Math.PI * 2;
    migimimi.position.set(
      -4.25 * Math.cos(radian),
      1,
      -4.25 * Math.sin(radian)
    );
    migimimi.receiveShadow = true;
    migimimi.castShadow = true;
    round_group.add(migimimi);
    migimimi.scale.set(0.2, 0.2, 0.2);
  }
  for (let i = 0; i < 10; i++) {
    //左手を作成
    var hidaritegeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var hidarite = new THREE.Mesh(hidaritegeometry, kawa1_mat);
    var radian = (i / 10) * Math.PI * 2;
    hidarite.position.set(
      -4.2 * Math.cos(radian),
      0.3,
      -4.2 * Math.sin(radian)
    );
    hidarite.receiveShadow = true;
    hidarite.castShadow = true;
    round_group.add(hidarite);
    hidarite.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis = new THREE.Vector3(10, 5, 10).normalize();
    //回転角度の指定(ラジアン)
    var angle = (4 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q.setFromAxisAngle(axis, angle);
    //直方体オブジェクトのquaternionプロパティに代入
    hidarite.quaternion.copy(q);
  }
  for (let i = 0; i < 10; i++) {
    //右手を作成
    var migitegeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var migite = new THREE.Mesh(migitegeometry, kawa1_mat);
    var radian = (i / 10) * Math.PI * 2;
    migite.position.set(-4.8 * Math.cos(radian), 0.3, -4.8 * Math.sin(radian));
    migite.receiveShadow = true;
    migite.castShadow = true;
    round_group.add(migite);
    migite.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis2 = new THREE.Vector3(-10, -10, 5).normalize();
    //回転角度の指定(ラジアン)
    var angle2 = (2 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q2 = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q2.setFromAxisAngle(axis2, angle2);
    //直方体オブジェクトのquaternionプロパティに代入
    migite.quaternion.copy(q2);
  }
  for (let i = 0; i < 10; i++) {
    //右足を作成
    var migiashigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var migiashi = new THREE.Mesh(migiashigeometry, kawa1_mat);
    var radian = (i / 10) * Math.PI * 2;
    migiashi.position.set(
      -4.2 * Math.cos(radian),
      -0.3,
      -4.2 * Math.sin(radian)
    );
    migiashi.receiveShadow = true;
    migiashi.castShadow = true;
    round_group.add(migiashi);
    migiashi.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis3 = new THREE.Vector3(-10, -10, 5).normalize();
    //回転角度の指定(ラジアン)
    var angle3 = (2 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q3 = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q3.setFromAxisAngle(axis3, angle3);
    //直方体オブジェクトのquaternionプロパティに代入
    migiashi.quaternion.copy(q3);
  }
  for (let i = 0; i < 10; i++) {
    //左足を作成
    var hidariashigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var hidariashi = new THREE.Mesh(hidariashigeometry, kawa1_mat);
    var radian = (i / 10) * Math.PI * 2;
    hidariashi.position.set(
      -4.8 * Math.cos(radian),
      -0.3,
      -4.8 * Math.sin(radian)
    );
    hidariashi.receiveShadow = true;
    hidariashi.castShadow = true;
    round_group.add(hidariashi);
    hidariashi.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis4 = new THREE.Vector3(-10, -5, -10).normalize();
    //回転角度の指定(ラジアン)
    var angle4 = (4 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q4 = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q4.setFromAxisAngle(axis4, angle4);
    //直方体オブジェクトのquaternionプロパティに代入
    hidariashi.quaternion.copy(q4);
  }

  //内側
  for (let i = 0; i < 8; i++) {
    // 顔を作成
    var kaogeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var kao = new THREE.Mesh(kaogeometry, kawa2_mat);
    var radian = (i / 8) * Math.PI * 2;
    kao.position.set(-2.5 * Math.cos(radian), 0.7, -2.5 * Math.sin(radian));
    kao.receiveShadow = true;
    kao.castShadow = true;
    round2_group.add(kao);
    kao.scale.set(0.7, 0.7, 0.7);
  }
  for (let i = 0; i < 8; i++) {
    // 胴体を作成
    var doutaigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var doutai = new THREE.Mesh(doutaigeometry, kawa2_mat);
    var radian = (i / 8) * Math.PI * 2;
    doutai.position.set(-2.5 * Math.cos(radian), 0, -2.5 * Math.sin(radian));
    doutai.receiveShadow = true;
    doutai.castShadow = true;
    round2_group.add(doutai);
    doutai.scale.set(0.7, 1, 0.7);
  }
  for (let i = 0; i < 8; i++) {
    // 左耳を作成
    var hidarimimigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var hidarimimi = new THREE.Mesh(hidarimimigeometry, kawa2_mat);
    var radian = (i / 8) * Math.PI * 2;
    hidarimimi.position.set(
      -2.75 * Math.cos(radian),
      1,
      -2.75 * Math.sin(radian)
    );
    hidarimimi.receiveShadow = true;
    hidarimimi.castShadow = true;
    round2_group.add(hidarimimi);
    hidarimimi.scale.set(0.2, 0.2, 0.2);
  }
  for (let i = 0; i < 8; i++) {
    // 右耳を作成
    var migimimigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var migimimi = new THREE.Mesh(migimimigeometry, kawa2_mat);
    var radian = (i / 8) * Math.PI * 2;
    migimimi.position.set(
      -2.25 * Math.cos(radian),
      1,
      -2.25 * Math.sin(radian)
    );
    migimimi.receiveShadow = true;
    migimimi.castShadow = true;
    round2_group.add(migimimi);
    migimimi.scale.set(0.2, 0.2, 0.2);
  }
  for (let i = 0; i < 8; i++) {
    //左手を作成
    var hidaritegeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var hidarite = new THREE.Mesh(hidaritegeometry, kawa2_mat);
    var radian = (i / 8) * Math.PI * 2;
    hidarite.position.set(
      -2.2 * Math.cos(radian),
      0.3,
      -2.2 * Math.sin(radian)
    );
    hidarite.receiveShadow = true;
    hidarite.castShadow = true;
    round2_group.add(hidarite);
    hidarite.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis = new THREE.Vector3(10, 5, 10).normalize();
    //回転角度の指定(ラジアン)
    var angle = (4 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q.setFromAxisAngle(axis, angle);
    //直方体オブジェクトのquaternionプロパティに代入
    hidarite.quaternion.copy(q);
  }
  for (let i = 0; i < 8; i++) {
    //右手を作成
    var migitegeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var migite = new THREE.Mesh(migitegeometry, kawa2_mat);
    var radian = (i / 8) * Math.PI * 2;
    migite.position.set(-2.8 * Math.cos(radian), 0.3, -2.8 * Math.sin(radian));
    migite.receiveShadow = true;
    migite.castShadow = true;
    round2_group.add(migite);
    migite.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis2 = new THREE.Vector3(-10, -10, 5).normalize();
    //回転角度の指定(ラジアン)
    var angle2 = (2 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q2 = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q2.setFromAxisAngle(axis2, angle2);
    //直方体オブジェクトのquaternionプロパティに代入
    migite.quaternion.copy(q2);
  }
  for (let i = 0; i < 8; i++) {
    //右足を作成
    var migiashigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var migiashi = new THREE.Mesh(migiashigeometry, kawa2_mat);
    var radian = (i / 8) * Math.PI * 2;
    migiashi.position.set(
      -2.2 * Math.cos(radian),
      -0.3,
      -2.2 * Math.sin(radian)
    );
    migiashi.receiveShadow = true;
    migiashi.castShadow = true;
    round2_group.add(migiashi);
    migiashi.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis3 = new THREE.Vector3(-10, -10, 5).normalize();
    //回転角度の指定(ラジアン)
    var angle3 = (2 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q3 = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q3.setFromAxisAngle(axis3, angle3);
    //直方体オブジェクトのquaternionプロパティに代入
    migiashi.quaternion.copy(q3);
  }
  for (let i = 0; i < 8; i++) {
    //左足を作成
    var hidariashigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var hidariashi = new THREE.Mesh(hidariashigeometry, kawa2_mat);
    var radian = (i / 8) * Math.PI * 2;
    hidariashi.position.set(
      -2.8 * Math.cos(radian),
      -0.3,
      -2.8 * Math.sin(radian)
    );
    hidariashi.receiveShadow = true;
    hidariashi.castShadow = true;
    round2_group.add(hidariashi);
    hidariashi.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis4 = new THREE.Vector3(-10, -5, -10).normalize();
    //回転角度の指定(ラジアン)
    var angle4 = (4 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q4 = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q4.setFromAxisAngle(axis4, angle4);
    //直方体オブジェクトのquaternionプロパティに代入
    hidariashi.quaternion.copy(q4);
  }

  //外中側
  for (let i = 0; i < 10; i++) {
    // 顔を作成
    var kaogeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var kao = new THREE.Mesh(kaogeometry, ki_mat);
    var radian = (i / 10) * Math.PI * 2;
    kao.position.set(-7.5 * Math.cos(radian), 0.7, -7.5 * Math.sin(radian));
    kao.receiveShadow = true;
    kao.castShadow = true;
    round5_group.add(kao);
    kao.scale.set(0.7, 0.7, 0.7);
  }
  for (let i = 0; i < 10; i++) {
    // 胴体を作成
    var doutaigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var doutai = new THREE.Mesh(doutaigeometry, ki_mat);
    var radian = (i / 10) * Math.PI * 2;
    doutai.position.set(-7.5 * Math.cos(radian), 0, -7.5 * Math.sin(radian));
    doutai.receiveShadow = true;
    doutai.castShadow = true;
    round5_group.add(doutai);
    doutai.scale.set(0.7, 1, 0.7);
  }
  for (let i = 0; i < 10; i++) {
    // 左耳を作成
    var hidarimimigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var hidarimimi = new THREE.Mesh(hidarimimigeometry, ki_mat);
    var radian = (i / 10) * Math.PI * 2;
    hidarimimi.position.set(
      -7.75 * Math.cos(radian),
      1,
      -7.75 * Math.sin(radian)
    );
    hidarimimi.receiveShadow = true;
    hidarimimi.castShadow = true;
    round5_group.add(hidarimimi);
    hidarimimi.scale.set(0.2, 0.2, 0.2);
  }
  for (let i = 0; i < 10; i++) {
    // 右耳を作成
    var migimimigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var migimimi = new THREE.Mesh(migimimigeometry, ki_mat);
    var radian = (i / 10) * Math.PI * 2;
    migimimi.position.set(
      -7.25 * Math.cos(radian),
      1,
      -7.25 * Math.sin(radian)
    );
    migimimi.receiveShadow = true;
    migimimi.castShadow = true;
    round5_group.add(migimimi);
    migimimi.scale.set(0.2, 0.2, 0.2);
  }
  for (let i = 0; i < 10; i++) {
    //左手を作成
    var hidaritegeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var hidarite = new THREE.Mesh(hidaritegeometry, ki_mat);
    var radian = (i / 10) * Math.PI * 2;
    hidarite.position.set(
      -7.2 * Math.cos(radian),
      0.3,
      -7.2 * Math.sin(radian)
    );
    hidarite.receiveShadow = true;
    hidarite.castShadow = true;
    round5_group.add(hidarite);
    hidarite.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis = new THREE.Vector3(10, 5, 10).normalize();
    //回転角度の指定(ラジアン)
    var angle = (4 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q.setFromAxisAngle(axis, angle);
    //直方体オブジェクトのquaternionプロパティに代入
    hidarite.quaternion.copy(q);
  }
  for (let i = 0; i < 10; i++) {
    //右手を作成
    var migitegeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var migite = new THREE.Mesh(migitegeometry, ki_mat);
    var radian = (i / 10) * Math.PI * 2;
    migite.position.set(-7.8 * Math.cos(radian), 0.3, -7.8 * Math.sin(radian));
    migite.receiveShadow = true;
    migite.castShadow = true;
    round5_group.add(migite);
    migite.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis2 = new THREE.Vector3(-10, -10, 5).normalize();
    //回転角度の指定(ラジアン)
    var angle2 = (2 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q2 = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q2.setFromAxisAngle(axis2, angle2);
    //直方体オブジェクトのquaternionプロパティに代入
    migite.quaternion.copy(q2);
  }
  for (let i = 0; i < 10; i++) {
    //右足を作成
    var migiashigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var migiashi = new THREE.Mesh(migiashigeometry, ki_mat);
    var radian = (i / 10) * Math.PI * 2;
    migiashi.position.set(
      -7.2 * Math.cos(radian),
      -0.3,
      -7.2 * Math.sin(radian)
    );
    migiashi.receiveShadow = true;
    migiashi.castShadow = true;
    round5_group.add(migiashi);
    migiashi.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis3 = new THREE.Vector3(-10, -10, 5).normalize();
    //回転角度の指定(ラジアン)
    var angle3 = (2 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q3 = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q3.setFromAxisAngle(axis3, angle3);
    //直方体オブジェクトのquaternionプロパティに代入
    migiashi.quaternion.copy(q3);
  }
  for (let i = 0; i < 10; i++) {
    //左足を作成
    var hidariashigeometry = new THREE.SphereGeometry(0.5, 32, 32);
    var hidariashi = new THREE.Mesh(hidariashigeometry, ki_mat);
    var radian = (i / 10) * Math.PI * 2;
    hidariashi.position.set(
      -7.8 * Math.cos(radian),
      -0.3,
      -7.8 * Math.sin(radian)
    );
    hidariashi.receiveShadow = true;
    hidariashi.castShadow = true;
    round5_group.add(hidariashi);
    hidariashi.scale.set(0.4, 0.2, 0.6);

    //回転軸ベクトルの宣言・規格化
    var axis4 = new THREE.Vector3(-10, -5, -10).normalize();
    //回転角度の指定(ラジアン)
    var angle4 = (4 * Math.PI) / 4;
    //クォータニオンオブジェクトの宣言
    var q4 = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q4.setFromAxisAngle(axis4, angle4);
    //直方体オブジェクトのquaternionプロパティに代入
    hidariashi.quaternion.copy(q4);
  }

  //平行光源
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  //シーンに追加
  scene.add(directionalLight);

  //照明を作成
  const light = new THREE.SpotLight(0xffffff, 1.4, 75, Math.PI / 4, 0.3);
  //ライトに影を有効にする
  light.castShadow = true;
  light.position.set(0, 10, 10);
  scene.add(light);

  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;

  //星空1(白色)を作成
  var stargeometry = new THREE.Geometry();
  // 配置する範囲
  var SIZE = 150;
  // 配置する個数
  var LENGTH = 5000;
  for (let i = 0; i < LENGTH; i++) {
    stargeometry.vertices.push(
      new THREE.Vector3(
        SIZE * (Math.random() - 0.4),
        SIZE * (Math.random() - 0.4),
        SIZE * (Math.random() - 0.4)
      )
    );
  }
  var starmaterial = new THREE.PointsMaterial({
    size: 0.4,
    color: 0xf0ffff,
  });
  var starmesh = new THREE.Points(stargeometry, starmaterial);
  scene.add(starmesh);

  //星空2(青色)を作成
  var stargeometry2 = new THREE.Geometry();
  // 配置する範囲
  var SIZE = 150;
  // 配置する個数
  var LENGTH = 1000;
  for (let i = 0; i < LENGTH; i++) {
    stargeometry2.vertices.push(
      new THREE.Vector3(
        SIZE * (Math.random() - 0.4),
        SIZE * (Math.random() - 0.4),
        SIZE * (Math.random() - 0.4)
      )
    );
  }
  var starmaterial2 = new THREE.PointsMaterial({
    size: 0.4,
    color: 0x00ffff,
  });
  var starmesh2 = new THREE.Points(stargeometry2, starmaterial2);
  scene.add(starmesh2);

  //星空3(燈色)を作成
  var stargeometry3 = new THREE.Geometry();
  // 配置する範囲
  var SIZE = 150;
  // 配置する個数
  var LENGTH = 1000;
  for (let i = 0; i < LENGTH; i++) {
    stargeometry3.vertices.push(
      new THREE.Vector3(
        SIZE * (Math.random() - 0.4),
        SIZE * (Math.random() - 0.4),
        SIZE * (Math.random() - 0.4)
      )
    );
  }
  var starmaterial3 = new THREE.PointsMaterial({
    size: 0.4,
    color: 0xff8c00,
  });
  var starmesh3 = new THREE.Points(stargeometry3, starmaterial3);
  scene.add(starmesh3);

  //星空4(紫色)を作成
  var stargeometry4 = new THREE.Geometry();
  // 配置する範囲
  var SIZE = 150;
  // 配置する個数
  var LENGTH = 1000;
  for (let i = 0; i < LENGTH; i++) {
    stargeometry4.vertices.push(
      new THREE.Vector3(
        SIZE * (Math.random() - 0.4),
        SIZE * (Math.random() - 0.4),
        SIZE * (Math.random() - 0.4)
      )
    );
  }
  var starmaterial4 = new THREE.PointsMaterial({
    size: 0.4,
    color: 0xff00ff,
  });
  var starmesh4 = new THREE.Points(stargeometry4, starmaterial4);
  scene.add(starmesh4);

  // 天界樹を作成
  var treegeometry = new THREE.PlaneGeometry(20, 20);
  var tree_mat = new THREE.MeshBasicMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: true,
    depthTest: false
  });
  tree_mat.map = tree_texture;
  var treeplane = new THREE.Mesh(treegeometry, tree_mat);
  treeplane.position.set(25, 1, 1);
  scene.add(treeplane);

  // 天界樹2を作成
  var tree2geometry = new THREE.PlaneGeometry(20, 20);
  var tree2_mat = new THREE.MeshBasicMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: true,
    depthTest: false
  });
  tree2_mat.map = tree2_texture;
  var tree2plane = new THREE.Mesh(tree2geometry, tree2_mat);
  tree2plane.position.set(-25, -1, -1);
  scene.add(tree2plane);

  // 天界樹3を作成
  var tree3geometry = new THREE.PlaneGeometry(20, 20);
  var tree3_mat = new THREE.MeshBasicMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: true,
    depthTest: false
  });
  tree3_mat.map = tree3_texture;
  var tree3plane = new THREE.Mesh(tree3geometry, tree3_mat);
  tree3plane.position.set(1.5, 1.5, 25);
  scene.add(tree3plane);

  // 天界樹4を作成
  var tree4geometry = new THREE.PlaneGeometry(20, 20);
  var tree4_mat = new THREE.MeshBasicMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: true,
    depthTest: false
  });
  tree4_mat.map = tree4_texture;
  var tree4plane = new THREE.Mesh(tree4geometry, tree4_mat);
  tree4plane.position.set(-1.5, -1.5, -25);
  scene.add(tree4plane);

  //　炎の作成
  VolumetricFire.texturePath = '/webgl/texture/';
  var fireWidth = 10;
  var fireHeight = 25;
  var fireDepth = 10;
  var sliceSpacing = 0.5;
  var fire = new VolumetricFire(
    fireWidth,
    fireHeight,
    fireDepth,
    sliceSpacing,
    camera

  );
  fire.mesh.position.set(24, 3, 24);
  scene.add(fire.mesh);
  //　炎2の作成
  var fire2 = new VolumetricFire(
    fireWidth,
    fireHeight,
    fireDepth,
    sliceSpacing,
    camera
  );
  fire2.mesh.position.set(-25, 3, 25);
  scene.add(fire2.mesh);
  //　炎3の作成
  var fire3 = new VolumetricFire(
    fireWidth,
    fireHeight,
    fireDepth,
    sliceSpacing,
    camera
  );
  fire3.mesh.position.set(26, 3, -24);
  scene.add(fire3.mesh);
  //　炎4の作成
  var fire4 = new VolumetricFire(
    fireWidth,
    fireHeight,
    fireDepth,
    sliceSpacing,
    camera
  );
  fire4.mesh.position.set(-24, 3, -26);
  scene.add(fire4.mesh);
  
  //†漆黒の霧†
  scene.fog = new THREE.Fog(0x000000, 10, 150);
  
  var ue = 0;
  var ue2 = 1;
  
  // 初回実行
  var update = function () {
    
    // FPS確認用
    stats.begin();
    
    requestAnimationFrame(update);

    var elapsed = clock.getElapsedTime();

    //母なる地球
    earth.rotation.y += 0.01;

    // 熊を飛び跳ねさせる
    round_group.rotation.y -= 0.006;
    round2_group.rotation.y += 0.005;
    round3_group.rotation.y += 0.005;
    round3_group.rotation.x += 0.005;
    round4_group.rotation.y -= 0.005;
    round4_group.rotation.x -= 0.005;
    round5_group.rotation.y += 0.007;
    if (round_group.position.y >= 0.7) {
      ue = 1;
    } else if (round_group.position.y <= -0.7) {
      ue = 0;
    }
    if (ue == 1) {
      round_group.position.y -= 0.04;
    } else if (ue == 0) {
      round_group.position.y += 0.04;
    }
    if (round2_group.position.y >= 0.5) {
      ue2 = 1;
    } else if (round2_group.position.y <= -0.5) {
      ue2 = 0;
    }
    if (ue2 == 1) {
      round2_group.position.y -= 0.03;
      round5_group.position.y -= 0.07;
    } else if (ue2 == 0) {
      round2_group.position.y += 0.03;
      round5_group.position.y += 0.07;
    }

    //星空を回転させる
    starmesh.rotation.y += 0.0001;
    starmesh.rotation.x += 0.0001;
    starmesh2.rotation.y += 0.0001;
    starmesh2.rotation.x += 0.0001;
    starmesh3.rotation.y += 0.0001;
    starmesh3.rotation.x += 0.0001;
    starmesh4.rotation.y += 0.0001;
    starmesh4.rotation.x += 0.0001;

    // カメラコントロール更新
    controls.update();

    // 炎の更新
    fire.update(elapsed);
    fire2.update(elapsed);
    fire3.update(elapsed);
    fire4.update(elapsed);

    // 木と目が合う
    treeplane.rotation.setFromRotationMatrix(camera.matrix);
    tree2plane.rotation.setFromRotationMatrix(camera.matrix);
    tree3plane.rotation.setFromRotationMatrix(camera.matrix);
    tree4plane.rotation.setFromRotationMatrix(camera.matrix);

    renderer.render(scene, camera);

    stats.end();
  };
  update();
};
window.addEventListener("DOMContentLoaded", init);