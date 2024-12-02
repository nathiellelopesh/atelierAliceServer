const {query} = require('./pool')

async function createTableProducts() {
    await query(`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            description VARCHAR(200),
            price DECIMAL(10,2) NOT NULL,
            images TEXT[],
            size VARCHAR(50),
            is_promotion BOOLEAN DEFAULT FALSE,
            is_sold BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log("Tabela 'products' criada ou já existe.");
}

async function createTableContact() {
    await query(`
        CREATE TABLE IF NOT EXISTS contact (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            message VARCHAR(400) NOT NULL,
            image BYTEA,
            got_answer BOOLEAN DEFAULT FALSE,
            delivery_date VARCHAR(100)
        );
    `)
    console.log("Tabela 'contact' criada ou já existe.");
}

async function migrateDatabase() {
    try {
        await createTableProducts();
        await createTableContact();
        
        console.log("Migração do banco de dados concluída com sucesso!");
    } catch (error) {
        console.error("Erro durante a migração:", error);
        process.exit(1);
    } finally {
        process.exit();
    }
}

migrateDatabase();
