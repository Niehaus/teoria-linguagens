// All jquery here
$(function() {
    // Handler for .ready() called.
    $('.nav-link').on("click", function() {
        let nav_itens = $('.nav-link')

        for (let i = 0; i < nav_itens.length; i++) {
            $(nav_itens[i]).removeClass('active');
        }

        $(this).addClass('active')
    });
});


function zoom_limiting(network, afterZoomLimit) {
    network.on("zoom", function () { //while zooming
        if (network.getScale() <= 0.50) {//the limit you want to stop at
            network.moveTo(afterZoomLimit); //set this limit so it stops zooming out here
        }
    });
}


// Graph Example of AFD and AFND
let nodes, edges, container,
    data, options, network,
    afterZoomLimit, minZoom


// Define zoom limits
afterZoomLimit = { //here we are setting the zoom limit to move to
    scale: 0.70,
}

// Define min zoom
minZoom = {
    scale: 1.5
}

// Define options for the graphs
options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    edges: {
        arrowStrikethrough: true,
        arrows: {
            to: {
                enabled: true,
                scaleFactor: 1,
                type: "arrow"
            },

        },
        smooth: {
            enabled: true,
            forceDirection: true,
            type: 'curvedCW',
            roundness: 0.4
        }
    },

    interaction: {
        dragNodes: false,
        // zoomView: false,
        // dragView: false
    },
    physics: false,
    layout: {
        hierarchical: {
            direction: 'UD'
        }
    }
};



// -> AFD: Create array of nodes and edges
nodes = new vis.DataSet([
    {id: 0, label: "S0", color: { background: "pink" }},
    {id: 1, label: "S1"},
    {id: 2, label: "S2", shapeProperties: { borderDashes: [5, 2] }, borderWidth: 2},
]);


edges = new vis.DataSet([
    {from: 0, to: 0, label: '0'},
    {from: 0, to: 1, label: '1'},
    {from: 1, to: 0, label: '0'},
    {from: 1, to: 2, label: '0'},
    {from: 2, to: 1, label: '0'},
    {from: 2, to: 2, label: '1'}
]);

data = {
    nodes: nodes,
    edges: edges
};

// Create a network
container = document.getElementById("mynetwork");
network = new vis.Network(container, data, options);
network.moveTo(minZoom);
zoom_limiting(network, afterZoomLimit)

// -> AFND: Create array of nodes and edges
edges = new vis.DataSet([
    {from: 0, to: 1, label: '1', smooth: { type: 'curvedCCW' }},
    {from: 0, to: 2, label: '1'},
    {from: 1, to: 2, label: '0', smooth: { type: 'curvedCCW' }},
    {from: 2, to: 2, label: '2'}
]);

data = {
    nodes: nodes,
    edges: edges
};

container = document.getElementById("mynetwork2");
network = new vis.Network(container, data, options);
network.moveTo(minZoom);
zoom_limiting(network, afterZoomLimit)
