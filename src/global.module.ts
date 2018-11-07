import { Global, Module, Logger } from '@nestjs/common';

@Global()
@Module({
  imports: [Logger],
  exports: [Logger],
})
export class GlobalModule { }