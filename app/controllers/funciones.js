//
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

//
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

//
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