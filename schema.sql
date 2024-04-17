CREATE TABLE categoria (
    categoria VARCHAR(100) PRIMARY KEY
);

CREATE TABLE pregunta (
    id SERIAL PRIMARY KEY,
    texto TEXT NOT NULL,
    imagen VARCHAR(255),
    opcion1 VARCHAR(255) NOT NULL,
    opcion2 VARCHAR(255) NOT NULL,
    opcion3 VARCHAR(255) NOT NULL,
    opcion4 VARCHAR(255) NOT NULL,
    explicacion TEXT NOT NULL,
    respuesta INTEGER NOT NULL CHECK (respuesta BETWEEN 1 AND 4),
    categoria VARCHAR(100) NOT NULL,
    FOREIGN KEY (categoria) REFERENCES categoria (categoria)
);

CREATE TABLE examen (
    id SERIAL PRIMARY KEY,
    fecha_inicio DATE,
    fecha_fin DATE
)

CREATE TABLE respuesta (
    id SERIAL PRIMARY KEY,
    opcion INTEGER CHECK (opcion BETWEEN 1 AND 4),
    respuesta BOOLEAN,
    examen_id INTEGER,
    pregunta_id INTEGER,
    FOREIGN KEY (examen_id) REFERENCES examen (id),
    FOREIGN KEY (pregunta_id) REFERENCES pregunta (id)
);

-- Insertar categorías
INSERT INTO categoria (categoria) VALUES 
('Señales de Tráfico'),
('Normas de Seguridad'),
('Normativas de Conducción');

-- Insertar preguntas
INSERT INTO pregunta (pregunta, opcion1, opcion2, opcion3, opcion4, respuesta, explicacion, categoria) VALUES 
('¿Qué indica la señal de tráfico triangular con un borde rojo y un dibujo de una flecha hacia abajo?', 'Prohibición de paso', 'Obligación de ceder el paso', 'Dirección obligatoria', 'Calle sin salida', 2, 'Esta señal indica la obligación de ceder el paso. Es importante prestar atención a estas señales para garantizar la seguridad vial.', 'Señales de Tráfico'),
('¿Cuál es la velocidad máxima permitida en una zona residencial?', '50 km/h', '60 km/h', '40 km/h', '70 km/h', 3, 'En las zonas residenciales, la velocidad máxima permitida suele ser de 40 km/h. Esto se implementa para garantizar la seguridad de los peatones y residentes.', 'Normas de Seguridad'),
('¿Cuál es la tasa máxima de alcohol permitida en sangre para conducir en tu país?', '0.5 g/l', '0.8 g/l', '0.2 g/l', '1.0 g/l', 2, 'La tasa máxima de alcohol permitida en sangre para conducir en muchos países es de 0.8 g/l. Superar este límite puede resultar en sanciones legales y poner en riesgo la seguridad vial.', 'Normativas de Conducción');

SELECT * FROM pregunta ORDER BY RANDOM() LIMIT 30;

SELECT * FROM pregunta ORDER BY RANDOM() LIMIT 30 WHERE categoria = '';


SELECT * FROM examen;

SELECT *
FROM examen
JOIN pregunta ON respuesta.pregunta_id = pregunta.id;

WITH nuevo_examen AS (
    INSERT INTO examen (fecha_inicio)
    VALUES (CURRENT_DATE)
    RETURNING id
)
INSERT INTO respuesta (pregunta_id, examen_id) 
SELECT id, (SELECT id FROM nuevo_examen)
FROM pregunta
ORDER BY RANDOM()
LIMIT 30;