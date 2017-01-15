/*
 * dreamskipper.js
 * Copyright (C) 2016 Michał 'czesiek' Czyżewski <me@czesiek.net>
 *
 * Distributed under terms of the MIT license.
 */

var dsLogger = function () {
  this.verbose = true;
  this.debug   = true;
}

dsLogger.prototype.log = function (message) {
  if (this.verbose) console.log(message);
}

dsLogger.prototype.debug = function (message) {
  if (this.verbose && this.debug) console.debug(message);
}

var dreamskipper = function (playerDivId) {
  this.scenes = {};
  this.currentVideoId = 0;
  this.videoElementIdPrefix = 'p';
  // ^ TODO: check if both exist in the document (on config load?)
  this.playerDiv = document.getElementById(playerDivId);
};

dreamskipper.prototype.getVideoEl = function (getInactiveEl = false) {
  var id = this.currentVideoId;
  
  if (getInactiveEl) {
    id = id ^= 1;
  }

  return document.getElementById(this.videoElementIdPrefix + (id + 1));
}

dreamskipper.prototype.toggleVideoId = function () {
  this.currentVideoId = this.currentVideoId ^= 1;
}

dreamskipper.prototype.switchVideoEl = function () {
  $(this.getVideoEl()).hide();
  this.toggleVideoId();
  $(this.getVideoEl()).show();
}

dreamskipper.prototype.prefetchScene = function (sceneId) {
  var inactiveVideoEl = this.getVideoEl(true);

  inactiveVideoEl.src = this.scenes[sceneId].moviePath;
  inactiveVideoEl.load();
}

dreamskipper.prototype.startScene = function(sceneId) {
  if (!(sceneId in this.scenes)) {
    throw 'No scene "' + sceneId + '" found';
  }

  console.log('Starting scene "' + sceneId + '"');

  // set <video> src attribute if not already set
  var encodedMoviePath = this.scenes[sceneId].moviePath.replace(' ', '%20');  // fix for spaces in filenames
  console.log(encodedMoviePath);
  var loadedSrc = this.getVideoEl().src.substr(-1 * encodedMoviePath.length);
  console.log('>' + loadedSrc + '<');
  console.log('>' + encodedMoviePath + '<');
  if (loadedSrc !== encodedMoviePath) {
    this.getVideoEl().src = this.scenes[sceneId].moviePath;
    console.log('setting the attr');
  }
  else {
    console.log('attr already set');
  }

  // TODO: blinking when changing src/loading
  // tip: does not blink on play() alone
  // https://github.com/Hivenfour/SeamlessLoop
  //this.getVideoEl().load();

  var t = this;

  this.getVideoEl().addEventListener('durationchange', function() {
    console.log('Duration change', t.getVideoEl().duration);
    t.prefetchScene(t.scenes[sceneId].nextScene);  // TODO: refactor nextScene → nextSceneId
  });

  // set the callback for <video>.onended
  this.getVideoEl().onended = function () {
    t.switchVideoEl();
    t.startScene(t.scenes[sceneId].nextScene);
    t.getVideoEl().play();
  }

  // CZ2: add setTimeout to prefetch the video 5s before end
  // CZ2: cancel all setTimeouts (overlay and prefetch) on overlay click

  // if set, start at startTime
  if ('startTime' in this.scenes[sceneId]) {
    this.getVideoEl().currentTime = this.scenes[sceneId].startTime;
  }

  // link overlays
  this.clearOverlays();
  if ('overlays' in this.scenes[sceneId]) {
    console.log('Adding overlays for scene "' + sceneId + '"');

    for (var i = 0; i < this.scenes[sceneId].overlays.length; i++) {
      console.log('scene startTime is ' + this.scenes[sceneId].startTime);
      this.addOverlay(this.scenes[sceneId].overlays[i], this.scenes[sceneId].startTime);
    }
  }
  else {
    console.log('No overlays for scene "' + sceneId + '"');
  }

  this.getVideoEl().play();
}

dreamskipper.prototype.addScenes = function(scenesDict) {
  // TODO: some validation would be nice
  this.scenes = scenesDict;
  console.log('Scenes added');
}

dreamskipper.prototype.clearOverlays = function() {
  var ovlDiv = this.playerDiv.getElementsByClassName('overlays')[0];
  ovlDiv.innerHTML = '';
  console.log('Overlays cleared');
}

dreamskipper.prototype.addOverlay = function(overlayConfig, sceneStartTime) {
  console.log('Adding an overlay');

  var ovl = document.createElement('div');
  ovl.setAttribute('class', 'ovl');

  // style it up
  var styleRule
    = 'top: '    + overlayConfig.position[0] + '%; '
    + 'right: '  + overlayConfig.position[1] + '%; '
    + 'bottom: ' + overlayConfig.position[2] + '%; '
    + 'left: '   + overlayConfig.position[3] + '%;';
  ovl.setAttribute('style', styleRule);

  // link it up
  var t = this;
  $(ovl).click(function() {
    t.startScene(overlayConfig.scene);
  });

  // add time bindings
  // FIXME: does not take scene's startTime into account
  if ('startTime' in overlayConfig) {
    if (typeof sceneStartTime != 'undefined' && overlayConfig.startTime - sceneStartTime > 0) {
      setTimeout(this._showOverlay, (overlayConfig.startTime - sceneStartTime) * 1000, ovl);
    }
    else {
      setTimeout(this._showOverlay, overlayConfig.startTime * 1000, ovl);
    }
  }
  else {
    this._showOverlay(ovl);
  }
  if ('duration' in overlayConfig) {
    if ('startTime' in overlayConfig) {
      if (typeof sceneStartTime != 'undefined' && overlayConfig.startTime - sceneStartTime > 0) {
        setTimeout(this._hideOverlay, (overlayConfig.startTime - sceneStartTime + overlayConfig.duration) * 1000, ovl);
      }
      else {
        setTimeout(this._hideOverlay, (overlayConfig.startTime + overlayConfig.duration) * 1000, ovl);
      }
    }
    else {
      setTimeout(this._hideOverlay, overlayConfig.duration * 1000, ovl);
    }
  }

  console.log('lets append');
  // append the overlay
  var ovlDiv = this.playerDiv.getElementsByClassName('overlays')[0];
  ovlDiv.appendChild(ovl);
}

dreamskipper.prototype._showOverlay = function(overlayDiv) {
  //console.log('showing after delay');  // debug?
  overlayDiv.style.display = 'block';
}
dreamskipper.prototype._hideOverlay = function(overlayDiv) {
  // Note: hides overlays even if they were cleared
  // maybe we should use deleteTimeout and track timeout ids

  //console.log('hiding after delay');  // debug?
  overlayDiv.style.display = 'none';
}

// --------

$( document ).ready(function() {
  var logger = new dsLogger();
  var ds = new dreamskipper('player_div');
  ds.addScenes(sceneData);  // dreamskipper-config.js included in the HTML

  $('#p2').hide();

  $('.poster-ovl').click(function() {
    $(this).parents('#poster').fadeOut();
    ds.startScene('1');
    document.getElementById('player-ambient').play();
  });
});
