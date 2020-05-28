//Devuelve una query dependiento al valor de la variable Type
exports.devolverQueryCreateUser = (type, username, email, password, phone) => {

    let query = '';

    if (parseInt(type)) {

        query = `INSERT INTO EDITORES (ID_EDITOR, EMAIL, PHONE, PASSWORD, USERNAME, ID_ROL)
        VALUES (NULL, "${email}", ${phone}, "${password}", "${username}", 2)
        `;
    } else {

        query = `INSERT INTO USUARIOS (ID_USUARIO, EMAIL, USERNAME, PASSWORD, ID_ROL)
        VALUES (NULL, "${email}", "${username}", "${password}", 1)
        `;
    }

    return query;
}

//Devuelve una query dependiento al valor de la variable Type
exports.devolverQueryCheckUser = (type, user) => {

    let query = '';

    if (parseInt(type)) {

        query = `SELECT 
        CASE WHEN EXISTS 
          (SELECT  E.ID_EDITOR
          FROM EDITORES E 
          WHERE E.USERNAME LIKE '${user}' OR E.EMAIL LIKE '${user}')
        THEN 1 
        ELSE 0 
        END AS booleano`;
    } else {

        query = `SELECT 
        CASE WHEN EXISTS 
          (SELECT  U.ID_USUARIO
          FROM USUARIOS U  
          WHERE U.USERNAME LIKE '${user}' OR U.EMAIL LIKE '${user}')
        THEN 1 
        ELSE 0 
        END AS booleano`;
    }

    return query;
}

//Devuelve una query dependiento al valor de la variable Type
exports.devolverQueryEditObra = (type, obra, value) => {

    let query = '';

    switch (parseInt(type)) {
        case 1:
            query = `UPDATE OBRAS SET NOMBRE = '${value}' WHERE ID_OBRA = ${obra}`;
            break;

        case 2:
            query = `UPDATE OBRAS SET AUTOR = '${value}' WHERE ID_OBRA = ${obra}`;
            break;

        case 3:
            query = `UPDATE OBRAS SET LANZAMIENTO = ${value} WHERE ID_OBRA = ${obra}`;
            break;

        case 4:
            query = `UPDATE OBRAS SET DESCRIPCION = '${value}' WHERE ID_OBRA = ${obra}`;
            break;

        case 5:
            query = `UPDATE OBRAS SET COVER = '${value}' WHERE ID_OBRA = ${obra}`;
            break;

        case 6:
            query = `UPDATE OBRAS SET ID_ESTADO = ${value} WHERE ID_OBRA = ${obra}`;
            break;

        case 7:
            query = `UPDATE OBRAS SET VISIBILIDAD = '${value}' WHERE ID_OBRA = ${obra}`;
            break;

        case 8:
            query = `UPDATE OBRAS SET ID_TIPO = ${value} WHERE ID_OBRA = ${obra}`;
            break;

        default:
            break;
    }

    return query;
}


//Devuelve una query dependiento al valor de la variable Type
exports.devolverQueryGenerateToken = (type, user, password) => {

    let query = '';

    if (parseInt(type)) {

        query = `SELECT 
                  (CASE WHEN PASSWORD LIKE '${password}' THEN 1 ELSE 0 END) AS booleano,
                  ID_EDITOR AS idUser,
                  R.NOMBRE AS idRol
                  FROM
                  EDITORES E
                  INNER JOIN ROLES R ON R.ID_ROL = E.ID_ROL
                  WHERE
                  EMAIL LIKE '${user}' OR USERNAME LIKE '${user}'
                  `;
    } else {

        query = `SELECT 
      (CASE WHEN PASSWORD LIKE '${password}' THEN 1 ELSE 0 END) AS booleano,
      ID_USUARIO AS idUser,
      R.NOMBRE AS idRol
      FROM
      USUARIOS U
      INNER JOIN ROLES R ON R.ID_ROL = U.ID_ROL
      WHERE
      EMAIL LIKE '${user}' OR USERNAME LIKE '${user}'
      `;
    }

    return query;
}