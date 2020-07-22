var init = function() {
	var width = 960,
  height = 540;

	// レンダラーを作成
	var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
  antialisa: true});
	renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;

	// シーンを作成
	var scene = new THREE.Scene();

	// カメラを作成
	var camera = new THREE.PerspectiveCamera(45, width/height, 1, 500);
  camera.position.set(0, 0, 10);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvas);

  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 1.5;

  //FPS確認用
  var stats = new Stats();
  stats.showPanel( 0 ); //0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );

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
	var texture_earth = textureLoader.load("texture/earth.jpg");
	var mat_earth = new THREE.MeshLambertMaterial();
	mat_earth.map = texture_earth;
  var textureLoader = new THREE.TextureLoader();
	var texture = textureLoader.load("texture/stone.jpg");
	var mat = new THREE.MeshPhongMaterial();
	mat.map = texture;
  var textureLoader = new THREE.TextureLoader();
	var kawa1_texture = textureLoader.load("texture/kawa1.jpg");
	var kawa1_mat = new THREE.MeshPhongMaterial();
	kawa1_mat.map = kawa1_texture;
  var textureLoader = new THREE.TextureLoader();
	var kawa2_texture = textureLoader.load("texture/kawa2.jpg");
	var kawa2_mat = new THREE.MeshPhongMaterial();
	kawa2_mat.map = kawa2_texture;
  var textureLoader = new THREE.TextureLoader();
	var minamo_texture = textureLoader.load("texture/minamo.jpg");
	var minamo_mat = new THREE.MeshPhongMaterial();
	minamo_mat.map = minamo_texture;
  var textureLoader = new THREE.TextureLoader();
	var kirakira_texture = textureLoader.load("texture/kirakira.jpg");
	var kirakira_mat = new THREE.MeshPhongMaterial();
	kirakira_mat.map = kirakira_texture;

  //バンプマップ読み込み
	var bump = textureLoader.load("texture/stone-bump.jpg");
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
  earth.rotation.x = Math.PI/12;
  scene.add(earth);
  earth.scale.set(2.5, 2.5, 2.5);

  //立方体
  var cubegeometry = new THREE.Geometry();
  for(let i=0; i<10; i++){
    var cubetemp = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
    var radian = i/10*(Math.PI)*2;
    cubetemp.position.set(-3.5*Math.cos(radian), 0, -3.5*Math.sin(radian));
    cubegeometry.mergeMesh(cubetemp);
  }
  var cube = new THREE.Mesh(cubegeometry, mat);
  cube.receiveShadow = true;
  cube.castShadow = true;
  round3_group.add(cube);
  cube.scale.set(0.5, 0.5, 0.5);

  //ドーナツ
  var torusgeometry = new THREE.Geometry();
  for(let i=0; i<10; i++){
    var torustemp = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 6, 12));
    var radian = i/10*(Math.PI)*2;
    torustemp.position.set(-7.5*Math.cos(radian), 0, -7.5*Math.sin(radian));
    torusgeometry.mergeMesh(torustemp);
  }
  var torus = new THREE.Mesh(torusgeometry, mat);
  torus.receiveShadow = true;
  torus.castShadow = true;
  round4_group.add(torus);
  torus.scale.set(0.5, 0.5, 0.5);

  //地面を作成
  var planegeometry = new THREE.PlaneGeometry(100,100);
  var plane = new THREE.Mesh( planegeometry, minamo_mat );
  plane.rotation.x = Math.PI / -2;                     
  scene.add(plane);
  plane.receiveShadow = true;
  plane.position.set(0, -8, 0)

//---内中側---
  //---熊を作成---
  var kaogeometry = new THREE.Geometry();
  var doutaigeometry = new THREE.Geometry();
  var migimimigeometry = new THREE.Geometry();
  var hidarimimigeometry = new THREE.Geometry();
  var migitegeometry = new THREE.Geometry();
  var hidaritegeometry = new THREE.Geometry();
  var migiashigeometry = new THREE.Geometry();
  var hidariashigeometry = new THREE.Geometry();

  for(let i=0; i<10; i++){

    //---顔を作成---
    var kaotemp = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32));
    var radian = i/10*(Math.PI)*2;
    kaotemp.position.set(-4.5*Math.cos(radian), 0.7, -4.5*Math.sin(radian));
    kaogeometry.mergeMesh(kaotemp);

    //---胴体を作成---
    var doutaitemp = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32));
    doutaitemp.position.set(-4.5* Math.cos(radian), 0, -4.5*Math.sin(radian));
    doutaigeometry.mergeMesh(doutaitemp);

    //---右耳を作成---
    var migimimitemp = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32));
    migimimitemp.position.set(-4.25* Math.cos(radian), 1, -4.25*Math.sin(radian));
    migimimigeometry.mergeMesh(migimimitemp);

    //---左耳を作成---
    var hidarimimitemp = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32));
    hidarimimitemp.position.set(-4.75* Math.cos(radian), 1, -4.75*Math.sin(radian));
    hidarimimigeometry.mergeMesh(hidarimimitemp);

    //---右手を作成---
    var migitetemp = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32));
    migitetemp.position.set(-4.8*Math.cos(radian), 0.3, -4.8*Math.sin(radian));
    //回転軸ベクトルの宣言・規格化
    var axis2 = new THREE.Vector3(-10, -10, 5).normalize();
    //回転角度の指定(ラジアン)
    var angle2 = 2*Math.PI/4;
    //クォータニオンオブジェクトの宣言
    var q2 = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q2.setFromAxisAngle(axis2, angle2);
    //直方体オブジェクトのquaternionプロパティに代入
    migitetemp.quaternion.copy(q2);
    migitegeometry.mergeMesh(migitetemp);

    //---左手を作成---
    var hidaritetemp = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32));
    hidaritetemp.position.set(-4.2*Math.cos(radian), 0.3, -4.2*Math.sin(radian));
    //回転軸ベクトルの宣言・規格化
    var axis = new THREE.Vector3(10, 5, 10).normalize();
    //回転角度の指定(ラジアン)
    var angle = 4*Math.PI/4;
    //クォータニオンオブジェクトの宣言
    var q = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q.setFromAxisAngle(axis, angle);
    //直方体オブジェクトのquaternionプロパティに代入
    hidaritetemp.quaternion.copy(q);
    hidaritegeometry.mergeMesh(hidaritetemp);

    //---右足を作成---
    var migiashitemp = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32));
    migiashitemp.position.set(-4.2*Math.cos(radian), -0.3, -4.2*Math.sin(radian));
    //回転軸ベクトルの宣言・規格化
    var axis3 = new THREE.Vector3(-10, -10, 5).normalize();
    //回転角度の指定(ラジアン)
    var angle3 = 2*Math.PI/4;
    //クォータニオンオブジェクトの宣言
    var q3 = new THREE.Quaternion();
    //回転軸と角度からクォータニオンを計算
    q3.setFromAxisAngle(axis3, angle3);
    //直方体オブジェクトのquaternionプロパティに代入
    migiashitemp.quaternion.copy(q3);
    migiashigeometry.mergeMesh(migiashitemp);

    //---左足を作成---
    var hidariashitemp = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32));
    hidariashitemp.position.set(-4.8*Math.cos(radian), -0.3, -4.8*Math.sin(radian));
    hidariashigeometry.mergeMesh(hidariashitemp);
  }

  var kao = new THREE.Mesh(kaogeometry, kawa1_mat);
  kao.receiveShadow = true;
  kao.castShadow = true;
  round_group.add(kao);
  kao.scale.set(0.7, 0.7, 0.7);

  var doutai = new THREE.Mesh(doutaigeometry, kawa1_mat);
  doutai.receiveShadow = true;
  doutai.castShadow = true;
	round_group.add(doutai);
	doutai.scale.set(0.7, 1, 0.7);

  var migimimi = new THREE.Mesh(migimimigeometry, kawa1_mat);
  migimimi.receiveShadow = true;
  migimimi.castShadow = true;
  round_group.add(migimimi);
  migimimi.scale.set(0.2, 0.2, 0.2);
  
  var hidarimimi = new THREE.Mesh(hidarimimigeometry, kawa1_mat);
  hidarimimi.receiveShadow = true;
  hidarimimi.castShadow = true;
	round_group.add(hidarimimi);
	hidarimimi.scale.set(0.2, 0.2, 0.2);

  var migite = new THREE.Mesh(migitegeometry, kawa1_mat);
  migite.receiveShadow = true;
  migite.castShadow = true;
	round_group.add(migite);
  migite.scale.set(0.4, 0.2, 0.6);
  
  var hidarite = new THREE.Mesh(hidaritegeometry, kawa1_mat);
  hidarite.receiveShadow = true;
  hidarite.castShadow = true;
	round_group.add(hidarite);
	hidarite.scale.set(0.4, 0.2, 0.6);

  var migiashi = new THREE.Mesh(migiashigeometry, kawa1_mat);
  migiashi.receiveShadow = true;
  migiashi.castShadow = true;
	round_group.add(migiashi);
	migiashi.scale.set(0.4, 0.2, 0.6);

  var hidariashi = new THREE.Mesh(hidariashigeometry, kawa1_mat);
  hidariashi.receiveShadow = true;
  hidariashi.castShadow = true;
	round_group.add(hidariashi);
  hidariashi.scale.set(0.4, 0.2, 0.6);
  //回転軸ベクトルの宣言・規格化
  var axis4 = new THREE.Vector3(-10, -5, -10).normalize();
  //回転角度の指定(ラジアン)
  var angle4 = 4*Math.PI/4;
  //クォータニオンオブジェクトの宣言
  var q4 = new THREE.Quaternion();
  //回転軸と角度からクォータニオンを計算
  q4.setFromAxisAngle(axis4, angle4);
  //直方体オブジェクトのquaternionプロパティに代入
  hidariashi.quaternion.copy(q4);

//内側
for(let i=0; i<8; i++){
  // 顔を作成
	var kaogeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var kao = new THREE.Mesh( kaogeometry, kawa2_mat );
  var radian = i/8*(Math.PI)*2;
	kao.position.set(-2.5* Math.cos(radian),0.7,-2.5*Math.sin(radian));
  kao.receiveShadow = true;
  kao.castShadow = true;
	round2_group.add(kao);
	kao.scale.set(0.7,0.7,0.7);
}
for(let i=0; i<8; i++){
	// 胴体を作成
	var doutaigeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var doutai = new THREE.Mesh( doutaigeometry, kawa2_mat );
  var radian = i/8*(Math.PI)*2;
	doutai.position.set(-2.5* Math.cos(radian),0,-2.5*Math.sin(radian));
  doutai.receiveShadow = true;
  doutai.castShadow = true;
	round2_group.add(doutai);
	doutai.scale.set(0.7,1,0.7);
}
for(let i=0; i<8; i++){
  // 左耳を作成
	var hidarimimigeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var hidarimimi = new THREE.Mesh( hidarimimigeometry, kawa2_mat );
  var radian = i/8*(Math.PI)*2;
	hidarimimi.position.set(-2.75* Math.cos(radian),1,-2.75*Math.sin(radian));
  hidarimimi.receiveShadow = true;
  hidarimimi.castShadow = true;
	round2_group.add(hidarimimi);
	hidarimimi.scale.set(0.2,0.2,0.2);
}
for(let i=0; i<8; i++){
  // 右耳を作成
	var migimimigeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var migimimi = new THREE.Mesh( migimimigeometry, kawa2_mat );
  var radian = i/8*(Math.PI)*2;
	migimimi.position.set(-2.25* Math.cos(radian),1,-2.25*Math.sin(radian));
  migimimi.receiveShadow = true;
  migimimi.castShadow = true;
	round2_group.add(migimimi);
	migimimi.scale.set(0.2,0.2,0.2);
}
for(let i=0; i<8; i++){
  //左手を作成
  var hidaritegeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var hidarite = new THREE.Mesh( hidaritegeometry, kawa2_mat );
  var radian = i/8*(Math.PI)*2;
	hidarite.position.set(-2.2* Math.cos(radian),0.3,-2.2*Math.sin(radian));
  hidarite.receiveShadow = true;
  hidarite.castShadow = true;
	round2_group.add(hidarite);
	hidarite.scale.set(0.4,0.2,0.6);

  //回転軸ベクトルの宣言・規格化
  var axis = new THREE.Vector3(10,5,10).normalize();
  //回転角度の指定(ラジアン)
  var angle = 4* Math.PI / 4;
  //クォータニオンオブジェクトの宣言
  var q = new THREE.Quaternion();
  //回転軸と角度からクォータニオンを計算
  q.setFromAxisAngle(axis,angle);
  //直方体オブジェクトのquaternionプロパティに代入
  hidarite.quaternion.copy(q);
}
for(let i=0; i<8; i++){
  //右手を作成
  var migitegeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var migite = new THREE.Mesh( migitegeometry, kawa2_mat );
  var radian = i/8*(Math.PI)*2;
	migite.position.set(-2.8* Math.cos(radian),0.3,-2.8*Math.sin(radian));
  migite.receiveShadow = true;
  migite.castShadow = true;
	round2_group.add(migite);
	migite.scale.set(0.4,0.2,0.6);

  //回転軸ベクトルの宣言・規格化
  var axis2 = new THREE.Vector3(-10,-10,5).normalize();
  //回転角度の指定(ラジアン)
  var angle2 = 2* Math.PI /4;
  //クォータニオンオブジェクトの宣言
  var q2 = new THREE.Quaternion();
  //回転軸と角度からクォータニオンを計算
  q2.setFromAxisAngle(axis2,angle2);
  //直方体オブジェクトのquaternionプロパティに代入
  migite.quaternion.copy(q2);
}
for(let i=0; i<8; i++){
  //右足を作成
  var migiashigeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var migiashi = new THREE.Mesh( migiashigeometry, kawa2_mat );
  var radian = i/8*(Math.PI)*2;
	migiashi.position.set(-2.2* Math.cos(radian),-0.3,-2.2*Math.sin(radian));
  migiashi.receiveShadow = true;
  migiashi.castShadow = true;
	round2_group.add(migiashi);
	migiashi.scale.set(0.4,0.2,0.6);

  //回転軸ベクトルの宣言・規格化
  var axis3 = new THREE.Vector3(-10,-10,5).normalize();
  //回転角度の指定(ラジアン)
  var angle3 = 2* Math.PI / 4;
  //クォータニオンオブジェクトの宣言
  var q3 = new THREE.Quaternion();
  //回転軸と角度からクォータニオンを計算
  q3.setFromAxisAngle(axis3,angle3);
  //直方体オブジェクトのquaternionプロパティに代入
  migiashi.quaternion.copy(q3);
}
for(let i=0; i<8; i++){
    //左足を作成
  var hidariashigeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var hidariashi = new THREE.Mesh( hidariashigeometry, kawa2_mat );
  var radian = i/8*(Math.PI)*2;
	hidariashi.position.set(-2.8* Math.cos(radian),-0.3,-2.8*Math.sin(radian));
  hidariashi.receiveShadow = true;
  hidariashi.castShadow = true;
	round2_group.add(hidariashi);
	hidariashi.scale.set(0.4,0.2,0.6);

  //回転軸ベクトルの宣言・規格化
  var axis4 = new THREE.Vector3(-10,-5,-10).normalize();
  //回転角度の指定(ラジアン)
  var angle4 = 4* Math.PI / 4;
  //クォータニオンオブジェクトの宣言
  var q4 = new THREE.Quaternion();
  //回転軸と角度からクォータニオンを計算
  q4.setFromAxisAngle(axis4,angle4);
  //直方体オブジェクトのquaternionプロパティに代入
  hidariashi.quaternion.copy(q4);
}

//外中側
for(let i=0; i<10; i++){
  // 顔を作成
	var kaogeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var kao = new THREE.Mesh( kaogeometry, kirakira_mat );
  var radian = i/10*(Math.PI)*2;
	kao.position.set(-7.5* Math.cos(radian),0.7,-7.5*Math.sin(radian));
  kao.receiveShadow = true;
  kao.castShadow = true;
	round5_group.add(kao);
	kao.scale.set(0.7,0.7,0.7);
}
for(let i=0; i<10; i++){
	// 胴体を作成
	var doutaigeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var doutai = new THREE.Mesh( doutaigeometry, kirakira_mat );
  var radian = i/10*(Math.PI)*2;
	doutai.position.set(-7.5* Math.cos(radian),0,-7.5*Math.sin(radian));
  doutai.receiveShadow = true;
  doutai.castShadow = true;
	round5_group.add(doutai);
	doutai.scale.set(0.7,1,0.7);
}
for(let i=0; i<10; i++){
  // 左耳を作成
	var hidarimimigeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var hidarimimi = new THREE.Mesh( hidarimimigeometry, kirakira_mat );
  var radian = i/10*(Math.PI)*2;
	hidarimimi.position.set(-7.75* Math.cos(radian),1,-7.75*Math.sin(radian));
  hidarimimi.receiveShadow = true;
  hidarimimi.castShadow = true;
	round5_group.add(hidarimimi);
	hidarimimi.scale.set(0.2,0.2,0.2);
}
for(let i=0; i<10; i++){
  // 右耳を作成
	var migimimigeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var migimimi = new THREE.Mesh( migimimigeometry, kirakira_mat );
  var radian = i/10*(Math.PI)*2;
	migimimi.position.set(-7.25* Math.cos(radian),1,-7.25*Math.sin(radian));
  migimimi.receiveShadow = true;
  migimimi.castShadow = true;
	round5_group.add(migimimi);
	migimimi.scale.set(0.2,0.2,0.2);
}
for(let i=0; i<10; i++){
  //左手を作成
  var hidaritegeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var hidarite = new THREE.Mesh( hidaritegeometry, kirakira_mat );
  var radian = i/10*(Math.PI)*2;
	hidarite.position.set(-7.2* Math.cos(radian),0.3,-7.2*Math.sin(radian));
  hidarite.receiveShadow = true;
  hidarite.castShadow = true;
	round5_group.add(hidarite);
	hidarite.scale.set(0.4,0.2,0.6);

  //回転軸ベクトルの宣言・規格化
  var axis = new THREE.Vector3(10,5,10).normalize();
  //回転角度の指定(ラジアン)
  var angle = 4* Math.PI / 4;
  //クォータニオンオブジェクトの宣言
  var q = new THREE.Quaternion();
  //回転軸と角度からクォータニオンを計算
  q.setFromAxisAngle(axis,angle);
  //直方体オブジェクトのquaternionプロパティに代入
  hidarite.quaternion.copy(q);
}
for(let i=0; i<10; i++){
  //右手を作成
  var migitegeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var migite = new THREE.Mesh( migitegeometry, kirakira_mat );
  var radian = i/10*(Math.PI)*2;
	migite.position.set(-7.8* Math.cos(radian),0.3,-7.8*Math.sin(radian));
  migite.receiveShadow = true;
  migite.castShadow = true;
	round5_group.add(migite);
	migite.scale.set(0.4,0.2,0.6);

  //回転軸ベクトルの宣言・規格化
  var axis2 = new THREE.Vector3(-10,-10,5).normalize();
  //回転角度の指定(ラジアン)
  var angle2 = 2* Math.PI /4;
  //クォータニオンオブジェクトの宣言
  var q2 = new THREE.Quaternion();
  //回転軸と角度からクォータニオンを計算
  q2.setFromAxisAngle(axis2,angle2);
  //直方体オブジェクトのquaternionプロパティに代入
  migite.quaternion.copy(q2);
}
for(let i=0; i<10; i++){
  //右足を作成
  var migiashigeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var migiashi = new THREE.Mesh( migiashigeometry, kirakira_mat );
  var radian = i/10*(Math.PI)*2;
	migiashi.position.set(-7.2* Math.cos(radian),-0.3,-7.2*Math.sin(radian));
  migiashi.receiveShadow = true;
  migiashi.castShadow = true;
	round5_group.add(migiashi);
	migiashi.scale.set(0.4,0.2,0.6);

  //回転軸ベクトルの宣言・規格化
  var axis3 = new THREE.Vector3(-10,-10,5).normalize();
  //回転角度の指定(ラジアン)
  var angle3 = 2* Math.PI / 4;
  //クォータニオンオブジェクトの宣言
  var q3 = new THREE.Quaternion();
  //回転軸と角度からクォータニオンを計算
  q3.setFromAxisAngle(axis3,angle3);
  //直方体オブジェクトのquaternionプロパティに代入
  migiashi.quaternion.copy(q3);
}
for(let i=0; i<10; i++){
    //左足を作成
  var hidariashigeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var hidariashi = new THREE.Mesh( hidariashigeometry, kirakira_mat );
  var radian = i/10*(Math.PI)*2;
	hidariashi.position.set(-7.8* Math.cos(radian),-0.3,-7.8*Math.sin(radian));
  hidariashi.receiveShadow = true;
  hidariashi.castShadow = true;
	round5_group.add(hidariashi);
	hidariashi.scale.set(0.4,0.2,0.6);

  //回転軸ベクトルの宣言・規格化
  var axis4 = new THREE.Vector3(-10,-5,-10).normalize();
  //回転角度の指定(ラジアン)
  var angle4 = 4* Math.PI / 4;
  //クォータニオンオブジェクトの宣言
  var q4 = new THREE.Quaternion();
  //回転軸と角度からクォータニオンを計算
  q4.setFromAxisAngle(axis4,angle4);
  //直方体オブジェクトのquaternionプロパティに代入
  hidariashi.quaternion.copy(q4);
}

  //平行光源
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
  directionalLight.position.set( 1, 1, 1 );
  //シーンに追加
  scene.add( directionalLight );

  //照明を作成
  const light = new THREE.SpotLight(0xFFFFFF, 1.4, 100, Math.PI / 4, 0.01);
  //ライトに影を有効にする
  light.castShadow = true;
  light.position.set(0,10,10);
  scene.add(light);

  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;

  //星空1(白色)を作成
	var stargeometry = new THREE.Geometry();
	// 配置する範囲
	var SIZE = 500;
	// 配置する個数
	var LENGTH = 5000;
	for (let i = 0; i < LENGTH; i++) {
	stargeometry.vertices.push(new THREE.Vector3(
		SIZE * (Math.random() - 0.5),
		SIZE * (Math.random() - 0.5),
		SIZE * (Math.random() - 0.5),));
	}
	var starmaterial = new THREE.PointsMaterial({
	size: 0.6,color: 0xF0FFFF,});
	var starmesh = new THREE.Points(stargeometry, starmaterial);
	scene.add(starmesh)

	//星空2(青色)を作成
	var stargeometry2 = new THREE.Geometry();
	// 配置する範囲
	var SIZE = 500;
	// 配置する個数
	var LENGTH = 1000;
	for (let i = 0; i < LENGTH; i++) {
	stargeometry2.vertices.push(new THREE.Vector3(
		SIZE * (Math.random() - 0.5),
		SIZE * (Math.random() - 0.5),
		SIZE * (Math.random() - 0.5),));
	}
	var starmaterial2 = new THREE.PointsMaterial({
	size: 0.6,color: 0x00FFFF,});
	var starmesh2 = new THREE.Points(stargeometry2, starmaterial2);
	scene.add(starmesh2)

	//星空3(燈色)を作成
	var stargeometry3 = new THREE.Geometry();
	// 配置する範囲
	var SIZE = 500;
	// 配置する個数
	var LENGTH = 1000;
	for (let i = 0; i < LENGTH; i++) {
	stargeometry3.vertices.push(new THREE.Vector3(
		SIZE * (Math.random() - 0.5),
		SIZE * (Math.random() - 0.5),
		SIZE * (Math.random() - 0.5),));
	}
	var starmaterial3 = new THREE.PointsMaterial({
	size: 0.6,color: 0xFF8C00,});
	var starmesh3 = new THREE.Points(stargeometry3, starmaterial3);
	scene.add(starmesh3)

	//星空4(紫色)を作成
	var stargeometry4 = new THREE.Geometry();
	// 配置する範囲
	var SIZE = 500;
	// 配置する個数
	var LENGTH = 1000;
	for (let i = 0; i < LENGTH; i++) {
	stargeometry4.vertices.push(new THREE.Vector3(
		SIZE * (Math.random() - 0.5),
		SIZE * (Math.random() - 0.5),
		SIZE * (Math.random() - 0.5),));
	}
	var starmaterial4 = new THREE.PointsMaterial({
	size: 0.6,color: 0xFF00FF,});
	var starmesh4 = new THREE.Points(stargeometry4, starmaterial4);
	scene.add(starmesh4)

  var ue = 0;
  var ue2 = 1;

	// 初回実行
	var update = function() {

    stats.begin();

		requestAnimationFrame(update);

    //母なる地球
    earth.rotation.y += 0.01;

	  // 熊を飛び跳ねさせる
		round_group.rotation.y -= 0.005;
    round2_group.rotation.y += 0.005;
    round3_group.rotation.y += 0.005;
    round3_group.rotation.x += 0.005;
    round4_group.rotation.y -= 0.005;
    round4_group.rotation.x -= 0.005;
    round5_group.rotation.y +=0.008;
    if(round_group.position.y >= 0.5){
      ue = 1;
    }
    if(round_group.position.y <= -0.5){
      ue = 0;
    }
    if(ue == 1){
      round_group.position.y -= 0.03;
    }
    if(ue == 0){
      round_group.position.y += 0.03;
    }
    if(round2_group.position.y >= 0.5){
      ue2 = 1;
    }
    if(round2_group.position.y <= -0.5){
      ue2 = 0;
    }
    if(ue2 == 1){
      round2_group.position.y -= 0.03;
      round5_group.position.y -= 0.08;
    }
    if(ue2 == 0){
      round2_group.position.y += 0.03;
      round5_group.position.y += 0.08;
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

    controls.update();

		renderer.render(scene, camera);

    stats.end();
	};
	update();
}
window.addEventListener('DOMContentLoaded', init);