/*
	WebPlotDigitizer - http://arohatgi.info/WebPlotdigitizer

	Copyright 2010-2013 Ankit Rohatgi <ankitrohatgi@hotmail.com>

	This file is part of WebPlotDigitizer.

    WebPlotDIgitizer is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WebPlotDigitizer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WebPlotDigitizer.  If not, see <http://www.gnu.org/licenses/>.


*/

var wpd = wpd || {};

// calibration info
wpd.Calibration = (function () {

    var Calib = function(dim) {
        // Pixel information
        var px = [];
        var py = [];

        // Data information
        var dimensions = dim == null ? 2 : dim;
        var dp = [];

        this.getCount = function () { return px.length; };
        this.getDimensions = function() { return dimensions; };
        this.addPoint = function(pxi, pyi, dxi, dyi, dzi) {
            var plen = px.length, dlen = dp.length;
            px[plen] = pxi;
            py[plen] = pyi;
            dp[dlen] = dxi; dp[dlen+1] = dyi;
            if(dimensions === 3) {
                dp[dlen+2] = dzi;
            }
        };
        this.getPoint = function(index) {
            if(index < 0 || index >= px.length) return null;

            return {
                px: px[index],
                py: py[index],
                dx: dp[dimensions*index],
                dy: dp[dimensions*index+1],
                dz: dimensions === 2 ? null : dp[dimensions*index + 2]
            };
        };
    };
    return Calib;
})();

// Data from a series
wpd.DataSeries = (function () {
    return function (dim) {
        var pixels = []; // flat array to store (x,y) pixel info.
        
        this.addPixel = function(pxi, pyi) {
            var plen = pixels.length;
            pixels[plen] = pxi;
            pixels[plen+1] = pyi;
        };

        this.insertPixel = function(pxi, pyi, index) {

        };

        this.removePixelAtIndex = function(index) {

        };

        this.removeLastPixel = function() {
            var pIndex = pixels.length/2;
            this.removePixelAtIndex(pIndex);
        };

        this.removeNearestPixel = function(x, y, threshold) {
        };

        this.reset = function() { pixels = []; };
        this.getCount = function() { return pixels.length/2; }
    };
})();


// Plot information
wpd.PlotData = (function () {
    var PlotData = function() {
        this.calibration = null;
        this.axes = null;
        this.dataSeriesColl = [];
    };

    PlotData.prototype.reset = function () {
        this.calibration = null;
        this.axes = null;
        this.dataSeriesColl = [];
    };

    PlotData.prototype.isCalibrated = function() {
        return !(this.calibration == null);
    };

    return PlotData;
})();