export type RowData = {
    id: number;
    title: string;
    description: string;
    image: string;
}

const dummyData: RowData[] = Array.from({length: 20},(_,i) => ({
    id: i + 1,
    title: `Row ${i + 1}`,
    description: `This is description for fow ${i + 1}`,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' 
}))

export default dummyData