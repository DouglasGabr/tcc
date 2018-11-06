import { Schema } from 'mongoose';

export const VendaSchema = new Schema({
  mysqlId: Number,
  valorTotal: Number,
  cliente: Object,
  itens: [Object],
});