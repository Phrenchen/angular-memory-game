/**
 * *factory for geometrical shapes.
 * ** random polygons within bounds
 * 
 */
export class SVGHelper {

    /**
     * creates HtmlElement containing a SVG with 1 random polygon within bounds
     * @param width 
     * @param height 
     * @param complexity 
     */
    public static createPolygon(width: number, height: number, fillColor: string, complexity: number): Element {
        const xmlns = "http://www.w3.org/2000/svg";
        const container: Element = document.createElementNS(xmlns, 'svg');
        container.appendChild(SVGHelper.getNode('rect', { width:width, height:height, fill:fillColor }));      
        return container;
    }

    private static getNode(n, v) {
        n = document.createElementNS("http://www.w3.org/2000/svg", n);
        for (var p in v)
          n.setAttributeNS(null, p, v[p]);
        return n;
      }

      public static createSVG(width: number, height: number, stopColor1: string = "#ff0000", stopColor2: string = "#0000ff") {
        const xmlns = "http://www.w3.org/2000/svg";
        let boxWidth = 300 + '';
        let boxHeight = 300 + '';
        // let stopColor1 = "#ff0000";
        // let stopColor2 = "#0000ff";

        // fullscreen
        // boxWidth = window.innerWidth + '';
        // boxHeight = window.innerHeight + '';

        boxWidth = width + '';
        boxHeight = height + '';
    
        const svgElem = document.createElementNS(xmlns, "svg");
        svgElem.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
        svgElem.setAttributeNS(null, "width", boxWidth);
        svgElem.setAttributeNS(null, "height", boxHeight);
        svgElem.style.display = "block";
    
        const g = document.createElementNS(xmlns, "g");
        svgElem.appendChild(g);
        g.setAttributeNS(null, 'transform', 'matrix(1,0,0,-1,0,' + boxHeight + ')');
    
        // draw linear gradient
        const defs = document.createElementNS(xmlns, "defs");
        const grad = document.createElementNS(xmlns, "linearGradient");
        grad.setAttributeNS(null, "id", "gradient");
        grad.setAttributeNS(null, "x1", "0%");
        grad.setAttributeNS(null, "x2", "0%");
        grad.setAttributeNS(null, "y1", "100%");
        grad.setAttributeNS(null, "y2", "0%");

        const stopTop = document.createElementNS(xmlns, "stop");
        stopTop.setAttributeNS(null, "offset", "0%");
        stopTop.setAttributeNS(null, "stop-color", stopColor1);
        grad.appendChild(stopTop);
        
        // const stopCenter = document.createElementNS(xmlns, "stop");
        // stopCenter.setAttributeNS(null, "offset", "50%");
        // stopCenter.setAttributeNS(null, "stop-color", stopColor2);
        // grad.appendChild(stopCenter);

        const stopBottom = document.createElementNS(xmlns, "stop");
        stopBottom.setAttributeNS(null, "offset", "100%");
        stopBottom.setAttributeNS(null, "stop-color", stopColor1);
        grad.appendChild(stopBottom);
        
        defs.appendChild(grad);
        g.appendChild(defs);
    
        // draw borders
        let coords = "M 0, 0";
        coords += " l 0, " + (boxHeight);       // height?
        coords += " l " + boxWidth +", 0";      // width?
        coords += " l 0, -" + boxHeight;
        coords += " l -" + boxWidth + ", 0";



        // let coords = "M 0, 0";
        // coords += " l 0, " + boxHeight;
        // coords += " l " + boxWidth +", 0";
        // coords += " l 0, -" + boxHeight;
        // coords += " l -" + boxWidth + ", 0";
    
        const path = document.createElementNS(xmlns, "path");
        path.setAttributeNS(null, 'stroke', "#000000");
        path.setAttributeNS(null, 'stroke-width', "0");
        path.setAttributeNS(null, 'stroke-linejoin', "round");
        path.setAttributeNS(null, 'd', coords);
        path.setAttributeNS(null, 'fill', "url(#gradient)");
        path.setAttributeNS(null, 'opacity', "1.0");
        g.appendChild(path);
    
        return svgElem;
        
        // const svgContainer = document.getElementById("svgContainer");
        // svgContainer.appendChild(svgElem);
    }

}
