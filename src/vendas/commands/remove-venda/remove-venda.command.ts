import { ICommand } from '@nestjs/cqrs';

export class RemoveVendaCommand implements ICommand {
  constructor(
    public readonly id: number,
  ) { }
}