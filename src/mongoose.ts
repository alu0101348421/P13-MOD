import {connect, connection} from 'mongoose';
import {Athlete, AthleteInterface} from './models/athlete';

/**
 * Clase que maneja la base de datos de atletas
 */
export class athletedb {
  /**
   * Constructor de la clase que inicializa la conexión a la base de datos
   */
  constructor() {
    connect('mongodb://127.0.0.1:27017/P13', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.log('Error connecting to MongoDB: ', err.message);
      connection.close();
    });
  }

  /**
   * Cierra la conexión a la base de datos
   */
  public close() {
    connection.close();
  }

  /**
   * Añade un atleta a la base de datos
   * @param athlete Atleta a añadir
   * @returns Promesa con el atleta añadido
   */
  public save(athlete: AthleteInterface) {
    return new Promise((resolve, reject) => {
      Athlete.findOne({NIF: athlete.NIF}).then((athleteFound) => {
        if (athleteFound) {
          reject(new Error('Athlete already exists'));
        } else {
          const newAthlete = new Athlete(athlete);
          newAthlete.save().then(() => {
            resolve(newAthlete);
          }).catch((err) => {
            reject(err);
          });
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * Busca un atleta en la base de datos
   * @param NIF NIF del atleta a buscar
   * @returns Promesa con el atleta encontrado
   */
  public find(NIF: string) {
    return new Promise((resolve, reject) => {
      if (!/^[0-9]{8}[a-zA-Z]$/.test(NIF)) {
        reject(new Error('NIF must contain only numbers and one letter'));
      }
      return Athlete.findOne({NIF: NIF}).then((athleteFound) => {
        if (athleteFound) {
          resolve(athleteFound);
        } else {
          reject(new Error('Athlete not found'));
        }
      });
    });
  }

  /**
   * Busca todos los atletas en la base de datos
   * @param NIF NIF del atleta a buscar
   * @param athlete Atleta con los nuevos datos
   * @returns Promesa con el atleta actualizado
   */
  public update(NIF: string, athlete: AthleteInterface) {
    return new Promise((resolve, reject) => {
      if (!/^[0-9]{8}[a-zA-Z]$/.test(NIF)) {
        reject(new Error('NIF must contain only numbers and one letter'));
      }
      return Athlete.findOneAndUpdate({NIF: NIF}, athlete,
          {new: true}).then((athleteFound) => {
        if (athleteFound) {
          resolve(athleteFound);
        } else {
          reject(new Error('Athlete not found'));
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * Elimina un atleta de la base de datos
   * @param NIF NIF del atleta a buscar
   * @returns Promesa con el atleta encontrado
   */
  public delete(NIF: string) {
    return new Promise((resolve, reject) => {
      if (!/^[0-9]{8}[a-zA-Z]$/.test(NIF)) {
        reject(new Error('NIF must contain only numbers and one letter'));
      }
      return Athlete.findOneAndDelete({NIF: NIF}).then((athleteFound) => {
        if (athleteFound) {
          resolve(athleteFound);
        } else {
          reject(new Error('Athlete not found'));
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

const db = new athletedb();
const FernandoAlonso: AthleteInterface = {
  name: 'Fernando',
  surname: 'Alonso',
  NIF: '12345678A',
  age: 40,
  sport: 'Driver',
  specialty: 'Pilot',
  personalRecord: 2,
};
const SergioPerez: AthleteInterface = {
  name: 'Sergio',
  surname: 'Perez',
  NIF: '12345678A',
  age: 40,
  sport: 'Driver',
  specialty: 'Pilot',
  personalRecord: 0,
};

if (process.argv[2] === 'save') {
  db.save(FernandoAlonso).then((result: any) => {
    console.log(result);
    connection.close();
  }).catch((err: any) => {
    console.log(err);
    connection.close();
  });
} else if (process.argv[2] === 'find') {
  db.find(FernandoAlonso.NIF).then((result: any) => {
    console.log(result);
    connection.close();
  }).catch((err: any) => {
    console.log(err);
    connection.close();
  });
} else if (process.argv[2] === 'update') {
  db.update(FernandoAlonso.NIF, SergioPerez).then((result: any) => {
    console.log(result);
    connection.close();
  }).catch((err: any) => {
    console.log(err);
    connection.close();
  });
} else if (process.argv[2] === 'delete') {
  db.delete('12345678A').then((result: any) => {
    console.log(result);
    connection.close();
  }).catch((err: any) => {
    console.log(err);
    connection.close();
  });
}