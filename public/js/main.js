const socket = io();
const client = feathers();
client.configure(feathers.socketio(socket, {
  timeout: 20000
}));

const organizations = client.service('organizations');
const shipments = client.service('shipments');
const subcities = client.service('subcities');
const collection_points = client.service('collection_points');
const items = client.service('items');
const deliveries = client.service('deliveries');

organizations.on('created', addOrg);
shipments.on('created', addShipments);
subcities.on('created', addSubcities);
collection_points.on('created', addCollectionPoints);
deliveries.on('created', addDeliveries);

function addOrg() {
  organizations.find({
    query: {}
  }).then(result => {
    $("#organizations-registered span.figure").html(result.total);
  });
}

function addDeliveries() {

  let total_deliveries_num = 0;
  deliveries.find({
    query: {}
  }).then(result => {
    //For each in result.data, add up num_packages_delivered
    result.data.forEach(element => {
      total_deliveries_num += element.num_of_packages_delivered;
    });
    $("#packages-distributed span.figure").html(total_deliveries_num);

  });
}

function addShipments() {
  shipments.find({
    query: {}
  }).then(result => {
    // Get count
    var goods_count = 0;
    result.data.forEach(element => {
      element.items.forEach(item => {
        goods_count += item.quantity;
      });
    });

    $("#goods-distributed span.figure").html(goods_count);

    // Get items in shipment
  });
};

function addSubcities() {
  subcities.find({
    query: {}
  }).then(result => {
    $("#areas-served span.figure").html(result.total);
  });
}

function addCollectionPoints() {
  collection_points.find({
    query: {}
  }).then(result => {
    $("#collection_points span.figure").html(result.total);
    addMarkers(map, result.data)
  });
};

function addMarkers(map, points) {
  points.forEach(element => {

    var el = document.createElement('div');
    el.className = 'marker';

    var popup = new mapboxgl.Popup({
        offset: 25
      })
      .setMaxWidth('300px')
      .setHTML(
        `
      <h5>${element.name}</h5>
      `
      );

    new mapboxgl.Marker(el).setLngLat(element.location.coordinates)
      .setPopup(popup)
      .addTo(map);
  });
}
