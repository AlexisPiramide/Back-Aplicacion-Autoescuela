CREATE TABLE categoria (
    categoria VARCHAR(100) PRIMARY KEY
);

CREATE TABLE usuario (
    alias VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL
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
    fecha_fin DATE,
    usuario VARCHAR(100) NOT NULL,
    FOREIGN KEY (usuario) REFERENCES usuario (alias)
);

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
('Reglas de tráfico'),
('Seguridad vial'),
('Señales de tráfico');

INSERT INTO pregunta (texto, imagen, opcion1, opcion2, opcion3, opcion4, explicacion, respuesta, categoria) VALUES 
('¿Cuál es la señal de tráfico que indica `Ceda el paso`?', NULL, 'Un triángulo rojo con borde blanco.', 'Un triángulo azul con borde blanco.', 'Un círculo rojo con borde blanco.', 'Un círculo blanco con una X roja.', 'La señal de tráfico que indica `Ceda el paso` es un triángulo rojo con borde blanco.', 1, 'Señales de tráfico'),
('¿Cuál es el límite de velocidad en una zona residencial?', NULL, '40 km/h', '50 km/h', '60 km/h', '70 km/h', 'El límite de velocidad en una zona residencial es generalmente de 40 km/h.', 1, 'Reglas de tráfico'),
('¿Qué significa una luz amarilla intermitente en un semáforo?', NULL, 'Precaución, el semáforo cambiará a rojo.', 'Avance con precaución.', 'Deténgase.', 'Pare para permitir que otros pasen.', 'Una luz amarilla intermitente en un semáforo significa precaución, el semáforo cambiará a rojo.', 1, 'Señales de tráfico'),
('¿Cuál es la distancia mínima de seguimiento recomendada al conducir a alta velocidad?', NULL, 'Dos segundos', 'Un segundo', 'Tres segundos', 'Cuatro segundos', 'La distancia mínima de seguimiento recomendada al conducir a alta velocidad es de al menos dos segundos.', 1, 'Seguridad vial'),
('¿Qué indica una línea amarilla continua en el borde de la carretera?', NULL, 'Prohibido adelantar.', 'Ceda el paso.', 'Zona de estacionamiento.', 'Límite de velocidad.', 'Una línea amarilla continua en el borde de la carretera indica que está prohibido adelantar.', 1, 'Reglas de tráfico'),
('¿Cuál es la distancia mínima de frenado en condiciones ideales?', NULL, 'Depende de la velocidad del vehículo.', 'Depende del tipo de vehículo.', 'Depende del estado del pavimento.', 'Depende del clima.', 'La distancia mínima de frenado en condiciones ideales es la distancia recorrida durante la reacción más la distancia recorrida durante la frenada, que depende de la velocidad del vehículo.', 1, 'Seguridad vial'),
('¿Cuál es la función principal de los airbags en un vehículo?', NULL, 'Reducir el impacto de una colisión.', 'Mantener la estabilidad del vehículo.', 'Mejorar la economía de combustible.', 'Proporcionar dirección asistida.', 'La función principal de los airbags en un vehículo es reducir el impacto de una colisión en los ocupantes del vehículo.', 1, 'Seguridad vial'),
('¿Qué debe hacer si un semáforo está en rojo pero no hay peatones cruzando?', NULL, 'Detenerse y esperar.', 'Continuar conduciendo con precaución.', 'Acelerar y cruzar rápidamente.', 'Hacer una pausa y luego continuar.', 'Debe detenerse y esperar hasta que el semáforo cambie a verde.', 1, 'Reglas de tráfico'),
('¿Qué indica una señal de tráfico con una flecha amarilla curvada hacia la izquierda?', NULL, 'Se permite girar a la izquierda.', 'Precaución, la curva es peligrosa.', 'Prohibido girar a la izquierda.', 'Zona de obras a la izquierda.', 'Una señal de tráfico con una flecha amarilla curvada hacia la izquierda indica que se permite girar a la izquierda.', 1, 'Señales de tráfico'),
('¿Cuál es la función principal de un cinturón de seguridad?', NULL, 'Reducir el riesgo de lesiones en caso de colisión.', 'Mantener la temperatura del interior del vehículo.', 'Evitar que el vehículo se deslice en condiciones de lluvia.', 'Mejorar la visibilidad del conductor.', 'La función principal de un cinturón de seguridad es reducir el riesgo de lesiones en caso de colisión al mantener al ocupante en su lugar.', 1, 'Seguridad vial'),
('¿Cuál es la señal de tráfico que indica `Prohibido estacionar`?', NULL, 'Un círculo rojo con una X blanca en el centro.', 'Un triángulo azul con borde blanco.', 'Una línea amarilla continua en el borde de la carretera.', 'Una línea blanca discontinua en el borde de la carretera.', 'La señal de tráfico que indica `Prohibido estacionar` es un círculo rojo con una X blanca en el centro.', 1, 'Señales de tráfico'),
('¿Cuál es la distancia mínima que debe mantener entre su vehículo y el vehículo que va adelante?', NULL, 'Una distancia que le permita detenerse de manera segura.', 'La longitud de su vehículo.', 'La longitud de dos coches.', 'Depende de la velocidad.', 'La distancia mínima que debe mantener entre su vehículo y el vehículo que va adelante es aquella que le permita detenerse de manera segura.', 1, 'Seguridad vial'),
('¿Qué significa una línea blanca discontinua en el borde de la carretera?', NULL, 'Se permite adelantar si es seguro hacerlo.', 'Prohibido adelantar.', 'Zona de estacionamiento.', 'Límite de velocidad.', 'Una línea blanca discontinua en el borde de la carretera indica que se permite adelantar si es seguro hacerlo.', 1, 'Reglas de tráfico'),
('¿Cuál es el límite de alcohol en la sangre permitido para conducir legalmente?', NULL, 'Depende de la jurisdicción.', '0.05% en la mayoría de los lugares.', '0.08% en la mayoría de los lugares.', '0.1% en la mayoría de los lugares.', 'El límite de alcohol en la sangre permitido para conducir legalmente es 0.08% en la mayoría de los lugares.', 2, 'Seguridad vial'),
('¿Qué debe hacer al aproximarse a un cruce sin semáforos ni señales de stop?', NULL, 'Ceder el paso a los vehículos que se aproximen desde la derecha.', 'Continuar sin detenerse.', 'Acelerar para atravesar rápidamente el cruce.', 'Detenerse únicamente si hay vehículos en el cruce.', 'Al aproximarse a un cruce sin semáforos ni señales de stop, debe ceder el paso a los vehículos que se aproximen desde la derecha.', 1, 'Reglas de tráfico'),
('¿Cuál es la distancia de seguimiento recomendada en condiciones de lluvia?', NULL, 'Doble la distancia de seguimiento normal.', 'La misma distancia de seguimiento que en condiciones secas.', 'Reduzca la distancia de seguimiento a la mitad.', 'No es necesario ajustar la distancia de seguimiento.', 'En condiciones de lluvia, se recomienda duplicar la distancia de seguimiento normal para permitir una mayor distancia de frenado.', 1, 'Seguridad vial'),
('¿Qué indica una señal de tráfico con una X roja sobre una figura?', NULL, 'Prohibición de realizar la acción indicada por la figura.', 'Obligación de realizar la acción indicada por la figura.', 'Precaución, la acción indicada es peligrosa.', 'Zona de estacionamiento.', 'Una señal de tráfico con una X roja sobre una figura indica la prohibición de realizar la acción indicada por la figura.', 1, 'Señales de tráfico'),
('¿Cuál es la velocidad máxima permitida en una autopista?', NULL, 'Depende de la jurisdicción.', '100 km/h en la mayoría de los lugares.', '120 km/h en la mayoría de los lugares.', '140 km/h en la mayoría de los lugares.', 'La velocidad máxima permitida en una autopista varía según la jurisdicción, pero suele ser de 120 km/h en la mayoría de los lugares.', 2, 'Reglas de tráfico'),
('¿Qué deben hacer los conductores al acercarse a un paso de peatones?', NULL, 'Ceder el paso a los peatones que estén cruzando o esperando para cruzar.', 'Continuar conduciendo sin detenerse.', 'Sonar la bocina para advertir a los peatones.', 'Acelerar para cruzar antes de que los peatones lo hagan.', 'Los conductores deben ceder el paso a los peatones que estén cruzando o esperando para cruzar al acercarse a un paso de peatones.', 1, 'Seguridad vial'),
('¿Qué indica una señal de tráfico con una figura de una mano levantada?', NULL, 'Prohibición de pasar.', 'Obligación de detenerse.', 'Paso permitido.', 'Precaución, zona de obras.', 'Una señal de tráfico con una figura de una mano levantada indica la obligación de detenerse.', 2, 'Señales de tráfico'),
('¿Cuál es la principal causa de accidentes de tráfico en condiciones de niebla densa?', NULL, 'Conducción a una velocidad inadecuada.', 'Falta de señales de tráfico.', 'Falla del sistema de iluminación del vehículo.', 'Uso de neumáticos en mal estado.', 'La principal causa de accidentes de tráfico en condiciones de niebla densa es la conducción a una velocidad inadecuada.', 1, 'Seguridad vial'),
('¿Cuál es el límite de velocidad en una zona escolar?', NULL, 'Depende de la jurisdicción.', '20 km/h en la mayoría de los lugares.', '30 km/h en la mayoría de los lugares.', '40 km/h en la mayoría de los lugares.', 'El límite de velocidad en una zona escolar suele ser de 30 km/h en la mayoría de los lugares.', 2, 'Reglas de tráfico'),
('¿Cuál es la función principal de un retrovisor lateral?', NULL, 'Ver los vehículos que se acercan desde atrás y los lados.', 'Mejorar la visibilidad del conductor en condiciones de poca luz.', 'Proporcionar una vista panorámica del entorno.', 'Ayudar a calcular la distancia al vehículo de enfrente.', 'La función principal de un retrovisor lateral es ver los vehículos que se acercan desde atrás y los lados.', 1, 'Seguridad vial'),
('¿Cuál es la señal de tráfico que indica `Calle de sentido único`?', NULL, 'Una flecha blanca en un fondo azul.', 'Una flecha blanca en un fondo negro.', 'Una flecha blanca en un fondo rojo.', 'Una flecha blanca en un fondo verde.', 'La señal de tráfico que indica `Calle de sentido único` es una flecha blanca en un fondo azul.', 1, 'Señales de tráfico'),
('¿Qué debe hacer al aproximarse a un cruce con un semáforo apagado?', NULL, 'Detenerse y ceder el paso según las reglas de prioridad.', 'Ignorar el cruce y continuar.', 'Acelerar para atravesarlo rápidamente.', 'Detenerse solo si hay otros vehículos en el cruce.', 'Al aproximarse a un cruce con un semáforo apagado, debe detenerse y ceder el paso según las reglas de prioridad.', 1, 'Reglas de tráfico'),
('¿Qué significa una línea amarilla continua en el centro de la carretera?', NULL, 'Prohibición de adelantar.', 'Permisividad para adelantar.', 'Zona de estacionamiento.', 'Límite de velocidad.', 'Una línea amarilla continua en el centro de la carretera indica la prohibición de adelantar.', 1, 'Reglas de tráfico'),
('¿Qué debe hacer si experimenta una avería en una autopista?', NULL, 'Estacionarse en el arcén y señalizar adecuadamente su vehículo.', 'Intentar reparar el vehículo inmediatamente.', 'Solicitar ayuda de otros conductores.', 'Continuar conduciendo hasta la próxima salida.', 'Si experimenta una avería en una autopista, debe estacionarse en el arcén y señalizar adecuadamente su vehículo.', 1, 'Seguridad vial'),
('¿Qué significa una luz verde intermitente en un semáforo?', NULL, 'Prohibición de avanzar.', 'Precaución, proceder con cuidado.', 'Avance con precaución si el cruce está despejado.', 'Deténgase y espere.', 'Una luz verde intermitente en un semáforo significa precaución, proceda con cuidado.', 2, 'Señales de tráfico'),
('¿Cuál es la primera medida a tomar en caso de presenciar un accidente de tráfico?', NULL, 'Detenerse de manera segura y brindar asistencia a los heridos si es posible.', 'Continuar conduciendo y alertar a las autoridades más adelante.', 'Llamar a amigos o familiares para informarles del accidente.', 'Documentar el accidente con fotografías antes de ayudar.', 'La primera medida a tomar en caso de presenciar un accidente de tráfico es detenerse de manera segura y brindar asistencia a los heridos si es posible.', 1, 'Seguridad vial'),
('¿Qué indica una señal de tráfico con una figura de una bicicleta?', NULL, 'Zona donde los ciclistas pueden circular.', 'Prohibición de circular en bicicleta.', 'Precaución, cruce frecuente de bicicletas.', 'Área de estacionamiento para bicicletas.', 'Una señal de tráfico con una figura de una bicicleta indica una zona donde los ciclistas pueden circular.', 1, 'Señales de tráfico'),
('¿Qué debe hacer al acercarse a un paso a nivel sin barreras?', NULL, 'Detenerse y asegurarse de que no se aproxime ningún tren.', 'Acelerar para cruzar rápidamente antes de que llegue el tren.', 'Continuar conduciendo sin detenerse.', 'Cambiar de carril para evitar el paso a nivel.', 'Al acercarse a un paso a nivel sin barreras, debe detenerse y asegurarse de que no se aproxime ningún tren.', 1, 'Reglas de tráfico'),
('¿Qué debe hacer al ver una luz amarilla fija en un semáforo?', NULL, 'Detenerse si es seguro hacerlo.', 'Continuar con precaución.', 'Acelerar para cruzar rápidamente.', 'Detenerse y esperar a que cambie a verde.', 'Al ver una luz amarilla fija en un semáforo, debe detenerse si es seguro hacerlo.', 1, 'Señales de tráfico'),
('¿Qué significa una señal de tráfico con una figura de una persona caminando?', NULL, 'Zona peatonal.', 'Prohibición de caminar por la zona.', 'Zona de juegos para niños.', 'Área de estacionamiento para peatones.', 'Una señal de tráfico con una figura de una persona caminando indica una zona peatonal.', 1, 'Señales de tráfico'),
('¿Cuál es la velocidad máxima permitida en una carretera rural sinuosa?', NULL, 'Depende de la jurisdicción.', '60 km/h en la mayoría de los lugares.', '80 km/h en la mayoría de los lugares.', '100 km/h en la mayoría de los lugares.', 'La velocidad máxima permitida en una carretera rural sinuosa suele ser de 60 km/h en la mayoría de los lugares.', 2, 'Reglas de tráfico'),
('¿Qué significa una luz roja intermitente en un semáforo?', NULL, 'Detenerse y ceder el paso.', 'Precaución, proceder con cuidado.', 'Avance con precaución si el cruce está despejado.', 'Deténgase y espere.', 'Una luz roja intermitente en un semáforo significa detenerse y ceder el paso.', 1, 'Señales de tráfico'),
('¿Cuál es la distancia de seguimiento recomendada en condiciones de tráfico denso?', NULL, 'Doble la distancia de seguimiento normal.', 'Reduzca la distancia de seguimiento a la mitad.', 'La misma distancia de seguimiento que en condiciones normales.', 'No es necesario ajustar la distancia de seguimiento.', 'En condiciones de tráfico denso, se recomienda reducir la distancia de seguimiento a la mitad para evitar colisiones.', 2, 'Seguridad vial'),
('¿Qué debe hacer al acercarse a un semáforo intermitente amarillo?', NULL, 'Disminuir la velocidad y estar preparado para detenerse.', 'Continuar con precaución si el cruce está despejado.', 'Acelerar para cruzar rápidamente antes de que cambie a rojo.', 'Detenerse y esperar a que cambie a verde.', 'Al acercarse a un semáforo intermitente amarillo, debe disminuir la velocidad y estar preparado para detenerse.', 1, 'Señales de tráfico'),
('¿Qué indica una señal de tráfico con una figura de una ambulancia?', NULL, 'Ruta de emergencia para ambulancias.', 'Prohibición de adelantar ambulancias.', 'Precaución, área de cruce de ambulancias.', 'Área de estacionamiento para ambulancias.', 'Una señal de tráfico con una figura de una ambulancia indica una ruta de emergencia para ambulancias.', 1, 'Señales de tráfico'),
('¿Qué debe hacer si su vehículo comienza a deslizarse en una carretera congelada?', NULL, 'Girar suavemente en la dirección del deslizamiento.', 'Girar bruscamente en la dirección opuesta al deslizamiento.', 'Presionar fuertemente el freno.', 'Acelerar para intentar salir del deslizamiento.', 'Si su vehículo comienza a deslizarse en una carretera congelada, debe girar suavemente en la dirección del deslizamiento para recuperar el control.', 1, 'Seguridad vial'),
('¿Cuál es la distancia mínima que debe mantener al adelantar a un ciclista?', NULL, 'Deje al menos un metro de distancia.', 'Pase lo más cerca posible del ciclista.', 'Depende de la velocidad del vehículo.', 'No es necesario mantener distancia.', 'Al adelantar a un ciclista, debe dejar al menos un metro de distancia para garantizar su seguridad.', 1, 'Seguridad vial'),
('¿Qué indica una señal de tráfico con una figura de un camión volcado?', NULL, 'Precaución, riesgo de camiones volcados.', 'Ruta para camiones volcados.', 'Zona de estacionamiento para camiones volcados.', 'Prohibición de tráfico de camiones.', 'Una señal de tráfico con una figura de un camión volcado indica precaución, riesgo de camiones volcados.', 1, 'Señales de tráfico'),
('¿Qué indica una señal de tráfico con una figura de un coche derrapando?', NULL, 'Precaución, curva peligrosa.', 'Zona de estacionamiento para derrapes.', 'Prohibición de derrapes.', 'Ruta de derrapes permitidos.', 'Una señal de tráfico con una figura de un coche derrapando indica precaución, curva peligrosa.', 1, 'Señales de tráfico'),
('¿Cuál es la función principal de los dispositivos de retención infantil en un vehículo?', NULL, 'Proteger a los niños en caso de colisión.', 'Mantener a los niños ocupados durante el viaje.', 'Evitar que los niños se despierten durante el viaje.', 'Mejorar la estabilidad del vehículo.', 'La función principal de los dispositivos de retención infantil en un vehículo es proteger a los niños en caso de colisión.', 1, 'Seguridad vial'),
('¿Cuál es la principal causa de accidentes de tráfico en condiciones de lluvia?', NULL, 'Conducción a una velocidad inadecuada.', 'Falta de señales de tráfico.', 'Falla del sistema de iluminación del vehículo.', 'Uso de neumáticos en mal estado.', 'La principal causa de accidentes de tráfico en condiciones de lluvia es la conducción a una velocidad inadecuada.', 1, 'Seguridad vial'),
('¿Cuál es la velocidad máxima permitida en una calle residencial?', NULL, 'Depende de la jurisdicción.', '40 km/h en la mayoría de los lugares.', '50 km/h en la mayoría de los lugares.', '60 km/h en la mayoría de los lugares.', 'La velocidad máxima permitida en una calle residencial suele ser de 40 km/h en la mayoría de los lugares.', 2, 'Reglas de tráfico');
