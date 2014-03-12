// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());

            // Setup click event handlers:
            var startButton = document.getElementById("startButton");
            startButton.addEventListener("click", startClick, false);

            var stopButton = document.getElementById("stopButton");
            stopButton.addEventListener("click", stopClick, false);
        }
    };

    var leak = null;
    function startClick(eventinfo) {
        if (leak !== null) {
            return;
        }
        leak = new Leaker();
        leak.init();
        leak.name = "Instance 1";
    }

    function stopClick(eventinfo) {
        leak.stop();
        leak = null;
    }


    function repeat(pattern, count) {
        if (count < 1) return '';
        var result = '';
        while (count > 0) {
            if (count & 1) result += pattern;
            count >>= 1, pattern += pattern;
        }
        return result;
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };
    var Leaker = function () { };
    Leaker.prototype = {
        init: function () {
            var result = new Array(100);
            for (var i = 0; i < result.length; ++i) {
                result[i] = repeat("ab", i);
            }
            this.payload = result;
            this._interval = null;
            this.start();
        },
        start: function () {
            var self = this;
            self._interval = setInterval(function () {
                self.onInterval(self.name);
            }, 1000);
        },
        stop: function () {
            if (this._interval !== null) {
                //DEMO to show leak: clearInterval(this._interval);
            }
        },
        onInterval: function (instanceName) {
            //display name
        }
    };

    app.start();
})();
