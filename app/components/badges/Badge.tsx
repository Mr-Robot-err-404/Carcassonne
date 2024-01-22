import { claimMap } from "./claimMap"
import { rotateMap } from "./rotate"
import { styleMap } from "./styleMap"

interface Props {
    str: string
    claim: string
    idx?: number | undefined
    spacing?: string
}

export default function Badge({ str, claim, idx, spacing }: Props) {
    const text = claimMap[claim].text
    const fontSize = claimMap[claim].fontSize
    const bg = styleMap[str].bg
    const position = styleMap[str].position
    let rotate = "0"
    let space = ""

    if (typeof idx === 'number') {
        rotate = rotateMap[idx]
    }
    if (spacing) {
        space = spacing 
    }

    return (
        <div className={`${position} ${space}`}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 640 640" xmlSpace="preserve">
                <g transform="matrix(0.5845910182 0 0 0.5845910182 320 320)" id="UV33t6GjSJt5zjO0hm41T">
                    <path className="pathStyle" transform=" translate(-256.0007462932, -256.0007462932)" d="M 211 7.3 C 205 1 196 -1.4 187.6 0.8 C 179.2 3 172.7 9.700000000000001 170.5 18.1 L 154.7 80.6 L 92.69999999999999 63.099999999999994 C 84.29999999999998 60.699999999999996 75.29999999999998 63.099999999999994 69.19999999999999 69.19999999999999 C 63.099999999999994 75.29999999999998 60.69999999999999 84.29999999999998 63.09999999999999 92.69999999999999 L 80.6 154.7 L 18.1 170.6 C 9.700000000000001 172.7 3.1000000000000014 179.29999999999998 0.8000000000000007 187.7 C -1.5 196.1 1 205 7.3 211 L 53.5 256 L 7.3 301 C 1 307 -1.4 316 0.8 324.4 C 3 332.79999999999995 9.700000000000001 339.29999999999995 18.1 341.5 L 80.6 357.3 L 63.099999999999994 419.3 C 60.699999999999996 427.7 63.099999999999994 436.7 69.19999999999999 442.8 C 75.29999999999998 448.90000000000003 84.29999999999998 451.3 92.69999999999999 448.90000000000003 L 154.7 431.40000000000003 L 170.5 493.90000000000003 C 172.6 502.3 179.2 508.90000000000003 187.6 511.20000000000005 C 196 513.5 204.9 511.00000000000006 211 504.80000000000007 L 256 458.6000000000001 L 301 504.80000000000007 C 307.1 511.00000000000006 316 513.5000000000001 324.4 511.20000000000005 C 332.79999999999995 508.9 339.29999999999995 502.30000000000007 341.5 493.90000000000003 L 357.3 431.40000000000003 L 419.3 448.90000000000003 C 427.7 451.3 436.7 448.90000000000003 442.8 442.8 C 448.90000000000003 436.7 451.3 427.7 448.90000000000003 419.3 L 431.40000000000003 357.3 L 493.90000000000003 341.5 C 502.3 339.4 508.90000000000003 332.8 511.20000000000005 324.4 C 513.5 315.99999999999994 511.00000000000006 307 504.80000000000007 301 L 458.6000000000001 256 L 504.80000000000007 211 C 511.00000000000006 204.9 513.5000000000001 196 511.20000000000005 187.6 C 508.9 179.2 502.30000000000007 172.7 493.90000000000003 170.5 L 431.40000000000003 154.7 L 448.90000000000003 92.69999999999999 C 451.3 84.29999999999998 448.90000000000003 75.29999999999998 442.8 69.19999999999999 C 436.7 63.099999999999994 427.7 60.69999999999999 419.3 63.09999999999999 L 357.3 80.6 L 341.4 18.1 C 339.29999999999995 9.700000000000001 332.7 3.1000000000000014 324.29999999999995 0.8000000000000007 C 315.8999999999999 -1.5 307 1 301 7.3 L 256 53.5 L 211 7.3 z" strokeLinecap="round" />
                </g>
                {typeof idx === 'undefined' &&
                    <g transform="matrix(1 0 0 1 537 502)" id="e2TycuUkP9zUpwZshQcSb">
                        <text xmlSpace="preserve" fontSize={fontSize} fontStyle="normal" fontWeight="normal" className="textStyle">
                            <tspan x="-292" y="-108.25974">{text}</tspan>
                        </text>
                    </g>
                }
                {typeof idx === 'number' &&
                    <g transform={`rotate(${rotate} 320 320) matrix(0.4098630614 0 0 0.4326830104 320 320)`} id="nMVxSKRbMd9UMw0clvYxB"  >
                        <path className="textStyle" transform=" translate(-192, -256.0125)" d="M 214.6 41.4 C 202.1 28.9 181.8 28.9 169.3 41.4 L 9.300000000000011 201.4 C -3.1999999999999886 213.9 -3.1999999999999886 234.2 9.300000000000011 246.7 C 21.80000000000001 259.2 42.10000000000001 259.2 54.60000000000001 246.7 L 160 141.2 L 160 448 C 160 465.7 174.3 480 192 480 C 209.7 480 224 465.7 224 448 L 224 141.2 L 329.4 246.6 C 341.9 259.1 362.2 259.1 374.7 246.6 C 387.2 234.09999999999997 387.2 213.8 374.7 201.3 L 214.7 41.30000000000001 z" strokeLinecap="round" />
                    </g>
                }
            </svg>
            <style jsx>{`
                .pathStyle {
                    stroke: none;
                    stroke-width: 1;
                    stroke-dasharray: none;
                    stroke-linecap: butt;
                    stroke-dashoffset: 0;
                    stroke-linejoin: miter;
                    stroke-miterlimit: 4;
                    fill: ${bg};
                    fill-rule: nonzero;
                    opacity: 1;
                }
                .textStyle {
                    stroke: none;
                    stroke-width: 1;
                    stroke-dasharray: none;
                    stroke-linecap: butt;
                    stroke-dashoffset: 0;
                    stroke-linejoin: miter;
                    stroke-miterlimit: 4;
                    fill: rgb(255,215,0);
                    fill-rule: nonzero;
                    opacity: 1;
                }
            `}</style>
        </div>
    )
}