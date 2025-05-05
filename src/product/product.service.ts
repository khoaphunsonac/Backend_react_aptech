import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel(Product.name)
        private productModel: Model<Product>
    ) { }

    findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<Product> {
        let product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException(`Document with ID ${id} not found`);
        }
        return product;
    }

    findByPrices(min: number, max: number): Promise<Product[]> {
        return this.productModel.find({
            $and: [
                {
                    price: { $gte: min }
                },
                {
                    price: { $lte: max }
                }
            ]
        }).exec();
    }

    findByKeyword(keyword: string): Promise<Product[]> {
        return this.productModel.find({
            name: { $regex: keyword, $options: 'i' }
        }).exec();
    }

    create(product: Product): Promise<Product | null> {
        return this.productModel.create(product);
    }

    update(id: string, product: Product): Promise<Product | null> {
        return this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        const result = await this.productModel.deleteOne({
            _id: id
        }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Document with ID ${id} not found`);
        }
    }

}
