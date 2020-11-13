CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    description TEXT,
    image VARCHAR(256) DEFAULT '/images/default.jpg',
    price BIGINT
);

CREATE TABLE IF NOT EXISTS stocks (
    id SERIAL PRIMARY KEY,
    product_id uuid,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    count INTEGER
);

INSERT INTO products (title, description, image, price)
VALUES (
        'Barker Albert brogues', 
        'Barker Albert is a classic brogue made on the 69 last. Made in a hi shine polished leather it presents elegance when on the foot.',
        '/images/barker_albert.jpg', 
        16667
    ),
    (
        'Loake Glendale rubber-soled brogue boots',
        'Loake Glendale is a wing-cap brogue boot with Derby or Gibson lacings on a Goodyear-welted sole made in Northamptonshire.',
        '/images/loake_glendale.jpg',
        20417
    ),
    (
        'Cheaney Edmund double monk shoes',
        'Cheaney Edmund is a double monk on a Goodyear welted leather sole.',
        '/images/cheaney_edmund.jpg',
        31667
    ),
    (
        'Carlos Santos 7902 Chelsea boots',
        '7902 is a very elegant plain fronted Chelsea boot on a Goodyear welted leather sole. Carlos Santos make some fabulous shoes for our Herring range to our designs. The shoes in the Patina collection are all part of the standard Carlos Santos own brand range. As the factory create these shoes with very fine hand crafting skills, including hand patination, you can order this style in many colours. We have chosen to stock a couple of colours but, if you are prepared to wait five to six weeks, we can supply any of the colours shown. If you do order a bespoke colour we reserve the right to charge a re-stocking fee of 20 GBP on unusual colours or sizes, if you cancel or return your order.',
        '/images/carlos_santos.jpg',
        24167
    ),
    (
        'Trickey''s James Loafers',
        'Trickers James is a thick-soled step-in penny-loafer style with a highly distinctive wide welt edge which gives a sturdy yet classic appearance.',
        '/images/trickers_james.jpg',
        32917
    ),
    (
        'Stemar Ravenna rubber-soled Chukka boots',
        'Ravenna is lightweight, flexible, supple and handmade in Italy. That ticks a lot of boxes already but you can add: rubber stud sole for grip and durability, blake-stitching for easy wearing and the finest quality leathers, making this a superb chukka boot.',
        '/images/stemar_ravenna.jpg',
        245.83
    ), 
    (
        'Church''s Air Travel slippers',
        'Church Air Travel is a lightweight mule slipper that comes with a pouch to store the slippers in while travelling.',
        '/images/church_air_travel.jpg',
        18333
    ),  
    (
        'Herring Fowey rubber-soled deck shoes',
        'Herring Fowey is a 2 eyelet deck shoe made in the traditional moccasin construction, with a non-marking Rubber sole unit.',
        '/images/herring_fowey.jpg',
        8250
    )
;

INSERT INTO stocks (product_id, count) SELECT id, 23 from products where title = 'Barker Albert brogues';
INSERT INTO stocks (product_id, count) SELECT id, 29 from products where title = 'Loake Glendale rubber-soled brogue boots';
INSERT INTO stocks (product_id, count) SELECT id, 33 from products where title = 'Cheaney Edmund double monk shoes';
INSERT INTO stocks (product_id, count) SELECT id, 32 from products where title = 'Carlos Santos 7902 Chelsea boots';
INSERT INTO stocks (product_id, count) SELECT id, 19 from products where title = 'Trickey''s James Loafers';
INSERT INTO stocks (product_id, count) SELECT id, 19 from products where title = 'Stemar Ravenna rubber-soled Chukka boots';
INSERT INTO stocks (product_id, count) SELECT id, 21 from products where title = 'Church''s Air Travel slippers';
INSERT INTO stocks (product_id, count) SELECT id, 29 from products where title = 'Herring Fowey rubber-soled deck shoes';
