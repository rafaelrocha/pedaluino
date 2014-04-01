function serialConTest() {
	var onGetDevices = function(ports) {
	  for (var i=0; i<ports.length; i++) {
	    console.log(ports[i].path);
	  }
	}
	chrome.serial.getDevices(onGetDevices);
}

onload = function() {

    console.log("loaded");
    serialConTest();





    var stage = new pb.Stage();
    var ctx = stage.getContext();

    var board = new pb.Board(ctx);
    stage.setBoard(board);

    var overdrive = new pb.stomp.Overdrive(ctx);
    var reverb = new pb.stomp.Reverb(ctx);
    var volume = new pb.stomp.Volume(ctx);
    var cabinet = new pb.stomp.Cabinet(ctx);

    board.addPedals([overdrive, reverb, volume, cabinet]);

    overdrive.setDrive(.1);
    overdrive.setTone(.4);
    overdrive.setLevel(.6);
    volume.setLevel(1);
    reverb.setLevel(.3);

    stage.render(document.getElementById('floor'));



    /*

        Sample controls

     */
    var state = false;

    var cb = document.getElementById('controlButton');
    var lb = document.getElementsByClassName('linein')[0];

    var playLineIn = function() {
        stage.stop();
        stage.input = new pb.io.StreamInput(stage.getContext());
        stage.input.addEventListener('loaded', function() {
            stage.route();
        });
    }

    lb.addEventListener('click', function() {
        state = true;
        cBDraw();
        playLineIn();
    });

    var cBDraw = function() {
        cb.innerHTML = state ? '&#9724;' : '&#9654;';
    };

    var cBHandler = function() {
        state = !state;
        cBDraw();
        stage.stop();
    };

    cb.addEventListener('click', cBHandler);		
};