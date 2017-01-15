/*
 * sceneData = { sceneId: sceneConfig }
 * sceneConfig = {
 *   "moviePath": "path/to/the/movie.mp4",
 *   "startTime": <start offset, defaults to 0>,
 *   "nextScene": <sceneId of the scene that follows>,
 *   "overlays": [ overlayConfig1, overlayConfig2, … ]
 * }
 * overlayConfig = {
 *   "startTime": <for how long (in seconds) should the overlay be hidden initially>,  // if ommited, the overlay is shown right from the start
 *   "duration": <how long the overlay should be displayed for>,  // if ommited, the overlay is shown for the rest of the scene
 *   "scene": <sceneId of the target scene>,
 *   "position": [ <top>, <right>, <bottom>, <left> ]
 * }
 */
var sceneData = {
  "1": 		{"moviePath": "media/1.mp4", 	   "nextScene": "1 loop"},
  "1 loop":	{"moviePath": "media/1 loop.mp4",  "nextScene": "1 loop", "overlays": [{"startTime": 0, "scene": "2", "position": [35, 61, 13, 10]}, {"startTime": 0, "scene": "7", "position": [39, 4, 9, 66]}]},
  "2": 		{"moviePath": "media/2.mp4", 	   "nextScene": "2 loop"},
  "2 loop":	{"moviePath": "media/2 loop.mp4",  "nextScene": "2 loop", "overlays": [{"startTime": 0, "scene": "3", "position": [49, 23, 29, 45]}, {"startTime": 0, "scene": "4", "position": [15, 23, 53, 33]}]},
  "7":      {"moviePath": "media/7.mp4",       "nextScene": "7 loop", "overlays": [{"startTime": 1, "duration": 3,  "scene": "16 loop", "position": [3, 30, 10, 11]}]},
  "7 loop": {"moviePath": "media/7 loop.mp4",  "nextScene": "7 loop", "overlays": [{"startTime": 0,  "scene": "8", "position": [1, 68, 1, 1]}, {"startTime": 0, "scene": "9", "position": [1, 1, 1, 70]}]},
  "8":		{"moviePath": "media/8.mp4", 	   "nextScene": "8 loop", "overlays": [{"startTime": 0, "duration": 4,  "scene": "14", "position": [1, 1, 1, 65]}]},
  "8 loop": {"moviePath": "media/8 loop.mp4",  "nextScene": "8 loop", "overlays": [{"startTime": 0, "scene": "1 loop", "position": [14, 2, 1, 2]}]},
  "9":		{"moviePath": "media/9.mp4", 	   "nextScene": "9a",  	  "overlays": [{"startTime": 21, "duration": 6, "scene": "10", "position": [1, 20, 8, 28]}]},
  "9a":		{"moviePath": "media/9.mp4", 	   "startTime": 5, "nextScene": "9a",  	  "overlays": [{"startTime": 21, "duration": 6, "scene": "10", "position": [1, 20, 8, 28]}]},
  "14":		{"moviePath": "media/14.mp4", 	   "nextScene": "14 loop"},
  "14 loop":{"moviePath": "media/14 loop.mp4", "nextScene": "14 loop", "overlays": [{"startTime": 0, "scene": "22 loop", "position": [21, 55, 8, 18]}, {"startTime": 0, "scene": "21 loop", "position": [19, 22, 41, 61]}]},
  "21 loop":{"moviePath": "media/21 loop.mp4", "nextScene": "21 loop", "overlays": [{"startTime": 36, "duration": 7, "scene": "18", "position": [14, 19, 1, 3]}, 
			{"startTime": 43, "duration": 16, "scene": "15 loop", "position": [14, 18, 14, 35]}]},
  "22 loop":{"moviePath": "media/22 loop.mp4", "nextScene": "22 loop", "overlays": [{"startTime": 36, "duration": 15, "scene": "9a", "position": [14, 32, 17, 25]}]},
  "3":		{"moviePath": "media/3.mp4",       "nextScene": "3 loop", "overlays": [{"startTime": 39, "duration": 7, "scene": "10", "position": [37, 23, 30, 30]}, 
			{"startTime": 5, "duration": 1, "scene": "19", "position": [14, 14, 6, 38]},{"startTime": 11, "duration": 1, "scene": "19", "position": [14, 14, 6, 38]},
			{"startTime": 21, "duration": 1, "scene": "19", "position": [14, 14, 6, 38]},{"startTime": 28, "duration": 2, "scene": "19", "position": [14, 14, 6, 38]},
			{"startTime": 3, "duration": 1, "scene": "18", "position": [14, 14, 6, 32]},{"startTime": 6, "duration": 4, "scene": "18", "position": [14, 14, 6, 32]},
			{"startTime": 13, "duration": 7, "scene": "18", "position": [14, 14, 6, 32]},{"startTime": 23, "duration": 4, "scene": "18", "position": [14, 14, 6, 32]}]},
  "3 loop": {"moviePath": "media/3 loop.mp4",   "nextScene": "3 loop", "overlays": [{"startTime": 33, "duration": 10, "scene": "10", "position": [37, 23, 30, 30]}, 
			{"startTime": 2, "duration": 2, "scene": "19", "position": [14, 14, 6, 38]},{"startTime": 8, "duration": 1, "scene": "19", "position": [14, 14, 6, 38]},
			{"startTime": 18, "duration": 1, "scene": "19", "position": [14, 14, 6, 38]},{"startTime": 25, "duration": 2, "scene": "19", "position": [14, 14, 6, 38]},
			{"startTime": 0, "duration": 2, "scene": "18", "position": [14, 14, 6, 32]},{"startTime": 4, "duration": 3, "scene": "18", "position": [14, 14, 6, 32]},
            {"startTime": 10, "duration": 7, "scene": "18", "position": [14, 14, 6, 32]},{"startTime": 20, "duration": 4, "scene": "18", "position": [14, 14, 6, 32]}]},
  "4":      {"moviePath": "media/4.mp4",       "nextScene": "4 loop", "overlays": [{"startTime": 19, "duration": 2,  "scene": "4a", "position": [1, 1, 1, 77]}]},
  "4a":     {"moviePath": "media/4.mp4",       "startTime": 37, "nextScene": "4 loop"},
  "4 loop": {"moviePath": "media/4 loop.mp4",  "nextScene": "4 loop", "overlays": [{"startTime": 19, "duration": 2, "scene": "23", "position": [1, 6, 30, 34]}, 
			{"startTime": 31, "duration": 4,   "scene": "23", "position": [1, 6, 30, 42]}, {"startTime": 36, "duration": 4, "scene": "5", "position": [1, 77, 1, 1]}]},
  "18":		{"moviePath": "media/18.mp4", 	   "nextScene": "18 loop"},
  "18 loop":{"moviePath": "media/18 loop.mp4", "nextScene": "18 loop", "overlays": [{"startTime": 0,  "scene": "20 loop", "position": [40, 29, 30, 31]}]},
  "19":		{"moviePath": "media/19.mp4", 	   "nextScene": "19 loop"},
  "19 loop":{"moviePath": "media/19 loop.mp4", "nextScene": "19 loop", "overlays": [{"startTime": 0,  "scene": "7", "position": [2, 55, 27, 20]}, {"startTime": 0, "scene": "2", "position": [2, 14, 50, 61]}]},
  "5":		{"moviePath": "media/5.mp4", 	   "nextScene": "1"},
  "23":		{"moviePath": "media/23.mp4", 	   "nextScene": "23", "overlays": [{"startTime": 2, "duration": 2, "scene": "16 loop", "position": [24, 48, 26, 13]}, 
            {"startTime": 17, "duration": 7, "scene": "16 loop", "position": [24, 48, 26, 13]},{"startTime": 7, "duration": 1, "scene": "20 loop", "position": [4, 13, 4, 25]},
			{"startTime": 15, "duration": 1, "scene": "20 loop", "position": [4, 13, 4, 25]},{"startTime": 25, "duration": 2, "scene": "20 loop", "position": [4, 13, 4, 25]}]},
  "16 loop":{"moviePath": "media/16 loop.mp4", "nextScene": "16 loop", "overlays": [{"startTime": 13, "duration": 10, "scene": "9a", "position": [1, 34, 1, 23]}, 
			{"startTime": 0, "duration": 12, "scene": "20 loop", "position": [1, 26, 1, 29]}]},
  "20 loop":{"moviePath": "media/20 loop.mp4", "nextScene": "20 loop", "overlays": [{"startTime": 0, "duration": 4, "scene": "16 loop", "position": [1, 12, 19, 47]}, 
			{"startTime": 16, "duration": 2, "scene": "16 loop", "position": [1, 12, 19, 47]},{"startTime": 7, "duration": 1, "scene": "15", "position": [18, 55, 1, 1]},
			{"startTime": 10, "duration": 1, "scene": "15", "position": [18, 55, 1, 1]}]},
  "10":		{"moviePath": "media/10.mp4", 	       "nextScene": "10 loop", "overlays": [{"startTime": 7, "duration": 10,  "scene": "15", "position": [26, 6, 49, 71]}]},
  "10 loop":{"moviePath": "media/10 loop.mp4", 	       "nextScene": "10 loop", "overlays": [{"startTime": 0, "scene": "11", "position": [26, 1, 37, 61]}, 
			{"startTime": 0,  "scene": "12", "position": [16, 40, 30, 1]}]},
  "11":		{"moviePath": "media/11.mp4", 	       "nextScene": "11", "overlays": [{"startTime": 2, "duration": 4, "scene": "5", "position": [37, 11, 28, 2]}, 
			{"startTime": 0, "duration":  2,  "scene": "17 loop", "position": [26, 1, 37, 61]}]},
  "12":		{"moviePath": "media/12.mp4", 	   "nextScene": "10 loop"},
  "15":		{"moviePath": "media/15.mp4", 	       "nextScene": "15 loop", "overlays": [{"startTime": 13, "duration": 1, "scene": "2 loop", "position": [16, 9, 11, 25]},
			{"startTime": 15, "duration": 1, "scene": "2 loop", "position": [16, 9, 11, 25]}]},
  "15 loop":{"moviePath": "media/15 loop.mp4", 	   "nextScene": "15 loop", "overlays": [{"startTime": 0, "duration": 3, "scene": "2 loop", "position": [16, 9, 11, 25]}, 
			{"startTime": 7, "duration": 1, "scene": "2 loop", "position": [16, 9, 11, 25]}, {"startTime": 3, "duration": 3, "scene": "3", "position": [16, 9, 11, 25]},
			{"startTime": 9, "duration": 2, "scene": "3", "position": [16, 9, 11, 25]}, {"startTime": 13, "duration": 2, "scene": "3", "position": [16, 9, 11, 25]}]},
  "17 loop":{"moviePath": "media/17 loop.mp4", "nextScene": "17 loop", "overlays": [{"startTime": 26,  "duration": 5, "scene": "10", "position": [1, 28, 27, 25]}]}  
}
