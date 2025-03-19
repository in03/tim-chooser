declare module 'react-force-graph-3d' {
  import { ComponentType } from 'react';

  interface ForceGraph3DProps {
    graphData: {
      nodes: Array<{
        id: string;
        name: string;
        val: number;
        color: string;
        fx: number;
        fy: number;
        fz: number;
        x?: number;
        y?: number;
        z?: number;
      }>;
      links: Array<{
        source: string;
        target: string;
        color: string;
        opacity: number;
      }>;
    };
    nodeLabel?: string;
    nodeRelSize?: number;
    linkWidth?: number;
    linkDirectionalParticles?: number;
    linkDirectionalParticleSpeed?: number;
    backgroundColor?: string;
    nodeCanvasObject?: (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => void;
    onNodeClick?: (node: any) => void;
    enableNodeDrag?: boolean;
    enableNavigationControls?: boolean;
    enablePointerInteraction?: boolean;
    d3Force?: (name: string, value: number) => void;
    d3VelocityDecay?: number;
    width?: number;
    height?: number;
  }

  const ForceGraph3D: ComponentType<ForceGraph3DProps>;
  export default ForceGraph3D;
} 