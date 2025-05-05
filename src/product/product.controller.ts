import { Body, Controller, Delete, Get, Param, ParseFloatPipe, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {

    constructor(
        private productService: ProductService
    ) { }

    @Get('find-all')
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get('find-by-id/:id')
    findById(@Param('id') id: string): Promise<Product> {
        return this.productService.findById(id);
    }

    @Get('find-by-keyword/:keyword')
    findByKeyword(@Param('keyword') keyword: string): Promise<Product[]> {
        return this.productService.findByKeyword(keyword);
    }

    @Get('find-by-prices/:min/:max')
    findByPrices(@Param('min', ParseFloatPipe) min: number, @Param('max', ParseFloatPipe) max: number): Promise<Product[]> {
        return this.productService.findByPrices(min, max);
    }

    @Post('create')
    create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }

    @Put('update/:id')
    update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
        return this.productService.update(id, product);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<void> {
        return this.productService.delete(id);
    }

}

