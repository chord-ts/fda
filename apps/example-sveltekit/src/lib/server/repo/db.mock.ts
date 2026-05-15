/**
 * In-memory mock для демонстрации без реальной БД.
 * Имитирует Drizzle-подобный API.
 */

interface Table<T> {
    rows: T[];
    insert(values: T): Promise<{ insertId?: string }>;
    findMany(): Promise<T[]>;
}

class MockDB {
    private tables = new Map<string, Table<any>>();

    table<T extends Record<string, any>>(name: string): Table<T> {
        if (!this.tables.has(name)) {
            this.tables.set(name, {
                rows: [],
                async insert(values: T) {
                    (this as any).rows.push(values);
                    return { insertId: crypto.randomUUID() };
                },
                async findMany() {
                    return (this as any).rows;
                },
            } satisfies Table<T>);
        }
        return this.tables.get(name)! as Table<T>;
    }
}

export const db = new MockDB();
