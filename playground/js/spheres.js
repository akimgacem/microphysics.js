var Playground	= Playground	|| {};

var sphereMeshes	= [];

Playground.Spheres	= function()
{
	this._material	= new THREE.MeshNormalMaterial();
	this._meshes	= [];
	this.config();
}

Playground.Spheres.prototype.destroy	= function()
{
	while( this._meshes.length )	this._removeOne();
}

Playground.Spheres.prototype.meshes	= function()
{
	return this._meshes;
}


Playground.Spheres.prototype.config	= function()
{
	while( this._meshes.length != pageOptions.spheres.quantity ){
		if( this._meshes.length < pageOptions.spheres.quantity ){
			this._addOne();
		}else{
			this._removeOne();
		}
	}
	
	var restitution	= pageOptions.spheres.restitution;
	this._meshes.forEach(function(mesh){
		microphysics.body(mesh).restitution= restitution; 
	})
}

Playground.Spheres.prototype._removeOne	= function()
{
	var mesh	= this._meshes.shift();
	if( !mesh )	return;
	scene.removeChild(mesh);
	microphysics.unbindMesh(mesh);
}

Playground.Spheres.prototype._addOne	= function()
{
	var restitution	= pageOptions.spheres.restitution;
	var radius	= 20 + Math.random()*50;
radius	= 120;
	var geometry	= new THREE.SphereGeometry(radius, 5, 5);
	var mesh	= new THREE.Mesh(geometry, this._material);
	mesh.position.x	= (2*Math.random()-1) * 1500;
	mesh.position.y	= (2*Math.random()-1) * 1500;
	mesh.position.z	= (2*Math.random()-1) * 1500;
	scene.addChild(mesh);

	sphereMeshes.push(mesh);
	this._meshes.push(mesh);

	microphysics.bindMesh(mesh, {
		restitution	: restitution
	});
	
	// initial speed
	var speed	= new THREE.Vector3(2*Math.random()-1, 2*Math.random()-1, 2*Math.random()-1)
				.normalize().multiplyScalar(5);
	microphysics.body(mesh).setVelocity(speed.x, speed.y, speed.z);	
}


//
//var sphereMeshes	= [];
//
//function spheresInit(){
//	var nbSpheres	= pageOptions.sphere.quantity;
//	var restitution	= pageOptions.sphere.restitution;
//
//	var material	= new THREE.MeshNormalMaterial();
//
//	for( var i = 0; i < nbSpheres; i++ ){
//		var radius	= 20+Math.random()*50;
//radius	= 120;
//		var geometry	= new THREE.SphereGeometry(radius, 5, 5);
//		var mesh	= new THREE.Mesh(geometry, material);
//		mesh.position.x	= (2*Math.random()-1) * 1500;
//		mesh.position.y	= (2*Math.random()-1) * 1500;
//		mesh.position.z	= (2*Math.random()-1) * 1500;
//		scene.addChild(mesh);
//		sphereMeshes.push(mesh);
//
//		microphysics.bindMesh(mesh, {
//			restitution	: restitution
//		});
//		
//		// initial speed
//		var speed	= new THREE.Vector3(2*Math.random()-1, 2*Math.random()-1, 2*Math.random()-1)
//					.normalize().multiplyScalar(5);
//		microphysics.body(mesh).setVelocity(speed.x, speed.y, speed.z);
//	}
//}