import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { NetworkService } from './network.service';

@Controller('network')
export class NetworkController {
  constructor(private networkService: NetworkService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/search-pods')
  searchPods() {
    return this.networkService.searchPods();
  }
}
