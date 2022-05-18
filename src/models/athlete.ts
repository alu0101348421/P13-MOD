import {Document, Schema, model} from 'mongoose';

interface AthleteDocumentInterface extends Document {
  name: string;
  surname: string;
  NIF: string;
  age: number;
  sport: 'Basketball' | 'Football' | 'Tennis' | 'Volleyball' | 'Running' |
  'Swimming' | 'Driver',
  specialty: string;
  personalRecord: number;
}

export interface AthleteInterface {
  name: string;
  surname: string;
  NIF: string;
  age: number;
  sport: 'Basketball' | 'Football' | 'Tennis' | 'Volleyball' | 'Running' |
  'Swimming' | 'Driver',
  specialty: string;
  personalRecord: number;
}


const AthleteSchema = new Schema<AthleteDocumentInterface>({
  name: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (value.length < 3) {
        throw new Error('Name must be at least 3 characters long');
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        throw new Error('Name must contain only letters');
      }
    },
  },
  surname: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (value.length < 3) {
        throw new Error('Surname must be at least 3 characters long');
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        throw new Error('Surname must contain only letters');
      }
    }
  },
  NIF: {
    type: String,
    required: true,
    unique: true,
    validate: (value: string) => {
      if (value.length !== 9) {
        throw new Error('NIF must be 9 characters long');
      } else if (!/^[0-9]{8}[a-zA-Z]$/.test(value)) {
        throw new Error('NIF must contain only numbers and one letter');
      }
    }
  },
  age: {
    type: Number,
    required: true,
  },
  sport: {
    type: String,
    required: true,
    enum: ['Basketball', 'Football', 'Tennis', 'Volleyball', 'Running',
      'Swimming', 'Driver'],
  },
  specialty: {
    type: String,
    required: true,
  },
  personalRecord: {
    type: Number,
    required: true,
  },
});

export const Athlete = model<AthleteDocumentInterface>('Athlete',
    AthleteSchema);