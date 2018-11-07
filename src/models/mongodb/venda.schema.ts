import { Schema } from 'mongoose';

export const VendaSchema = new Schema({
  id: Number,
  valorTotal: Number,
  cliente: Object,
  itens: [Object],
});