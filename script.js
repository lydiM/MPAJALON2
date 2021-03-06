/*Déclaration d'une première couche raster pour l'affichage de la carte*/
var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});

/*Déclaration d'une deuxième couche vector pour l'affichage du du dessin*/
var source = new ol.source.Vector({wrapX: false});

/*Définition du style pour le dessin*/
var vector = new ol.layer.Vector({
  source: source,
  style: new ol.style.Style({
    fill:new ol.style.Fill({
      color:'rgba(255,255,255,0.2)'
    }),
    stroke: new ol.style.Stroke({
     color: '#ffcc3',
    //  color: '#FF0000',

      width:2
    }),

  })

    });
	
	
var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
      });

/*Ajout des deux couches au conteneur*/

var map = new ol.Map({
	
controls: ol.control.defaults({
          attributionOptions: {
            collapsible: false
          }
        }).extend([mousePositionControl]),
  layers: [raster, vector],
  target: 'map',
  view: new ol.View({
  center: ol.proj.transform([-4.49702, 48.39888], 'EPSG:4326', 'EPSG:3857'), //zoom sur l'UBO
  zoom:14
     })
   });

/*Fonction qui permet de créer le dessin */
function addInteraction(vector1) {
  var draw;
  var value= 'Circle';

  /*Initialisation de la géometry */
  geometryFunction = function(coordinate, geometry) {
   if (!geometry) {
   geometry = new ol.geom.Polygon(0);

  }


    var point = coordinate[1]; //point de départ
    var radius = document.formu.distance.value*1852; //taille des segments
    var newCoordinates = []; //Tableau pour stoker les coordonnées des nouveaux points

    var nbr =100;
    var angle1=document.formu.angle1.value*(Math.PI/180); //conversion en Radian
    var offsetY = radius * Math.cos(angle1); //décalage de Y
    var offsetX = radius * Math.sin(angle1); //décalage de X
      for (var i =0; i<nbr;i++){
          /*Récupération des angles*/
           var angle2=(((document.formu.angle2.value*(Math.PI/180))-angle1)*i/nbr)+angle1; //conversion en Radian
             var ang = document.formu.angle2.value*(Math.PI/180);


   var offsetY2 =  radius*Math.cos(angle2); //décalage de Y

   var offsetX2 = radius*Math.sin(angle2); //décalage de X


   var offY2 = radius * Math.cos(ang); //décalage de Y

   var offX2 = radius * Math.sin(ang); //décalage de X



//le code finale réussi a 100% :)
if (i==0  ){
 newCoordinates.push(  [point[0] + offsetX, point[1] + offsetY],  [point[0], point[1]],
                      [point[0] + offsetX2, point[1]+offsetY2]

                    );

} else {newCoordinates.push(
                     [point[0] + offsetX2, point[1]+offsetY2]

                 );
               }
       if (i ==nbr-1){
                 newCoordinates.push(
                                  [point[0] + offX2, point[1] + offY2], [point[0], point[1]]
                                  );
               }

}

    geometry.setCoordinates([newCoordinates]);//
    return geometry;
  }; //End geometryFunction

  draw = new ol.interaction.Draw({
    source: source,
    type: (value),
    geometryFunction: geometryFunction
  });
  map.addInteraction(draw);
}// fin de la fonction

function dessin() {
  addInteraction(vector);
}
