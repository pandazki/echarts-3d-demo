export type GraphNode<TPos, TData> = {
    id: string;
    pos: TPos;
    data: TData;
};

export type GraphEdge<TPos, TData> = {
    source: GraphNode<TPos, TData>;
    target: GraphNode<TPos, TData>;
};

export type Graph<TPos, TData> = {
    nodes: GraphNode<TPos, TData>[];
    edges: GraphEdge<TPos, TData>[];
};
export type Position3D = {
    x: number;
    y: number;
    z: number;
};

export type Graph3D<TData> = Graph<Position3D, TData>;

export type Color = string;

export class SimpleGraph3D implements Graph3D<Color> {
    public nodes: GraphNode<Position3D, Color>[];
    public edges: GraphEdge<Position3D, Color>[];

    constructor(nodes: GraphNode<Position3D, Color>[], edges: GraphEdge<Position3D, Color>[]) {
        this.nodes = nodes;
        this.edges = edges;
    }

    public getPredecessors(node: GraphNode<Position3D, Color>): GraphNode<Position3D, Color>[] {
        return this.edges.filter(edge => edge.target.id === node.id).map(edge => edge.source);
    }

    static generateFakeGraph(): SimpleGraph3D {
        const nodes: GraphNode<Position3D, Color>[] = [
            {
                id: 'A',
                pos: {x: 1, y: 1, z: 0},
                data: '#f6ab1d',
            },
            {
                id: 'B1',
                pos: {x: 1, y: 2, z: 0},
                data: '#57f3a5',
            },
            {
                id: 'B2',
                pos: {x: 1, y: 2, z: 12},
                data: '#57f3a5',
            },
            {
                id: 'C1',
                pos: {x: 2, y: 2, z: 0},
                data: '#e848e1',
            },
            {
                id: 'C2',
                pos: {x: 2, y: 2, z: 8},
                data: '#e848e1',
            },
            {
                id: 'C3',
                pos: {x: 2, y: 2, z: 16},
                data: '#e848e1',
            },
            {
                id: 'D',
                pos: {x: 3, y: 3, z: 0},
                data: '#46a8ec',
            }];
        const edges: GraphEdge<Position3D, Color>[] = [
            {
                target: nodes[1],
                source: nodes[0],
            },
            {
                target: nodes[2],
                source: nodes[0],
            },
            {
                target: nodes[2],
                source: nodes[1],
            },
            {
                target: nodes[3],
                source: nodes[0],
            },
            {
                target: nodes[4],
                source: nodes[0],
            },
            {
                target: nodes[5],
                source: nodes[0],
            },
            {
                target: nodes[4],
                source: nodes[3],
            },
            {
                target: nodes[5],
                source: nodes[4],
            },
            {
                target: nodes[6],
                source: nodes[1],
            },
            {
                target: nodes[6],
                source: nodes[3],
            }];
        return new SimpleGraph3D(nodes, edges);
    }
}

