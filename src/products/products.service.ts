import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly database: DatabaseService) {}

  async create(createProductDto: Prisma.ProductsCreateInput) {
    const create = await this.database.products.create({
      data: createProductDto,
    });
    return { data: create, message: 'successfully created', success: true };
  }

  async findAll() {
    const find_all = await this.database.products.findMany();
    return find_all;
  }

  async findOne(id: string) {
    const find_one = await this.database.products.findUnique({
      where: {
        id,
      },
    });
    return find_one;
  }

  async update(id: string, updateProductDto: Prisma.ProductsUpdateInput) {
    const update = await this.database.products.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
    return { data: update , message: 'successfully updated' ,  success: true };
  }

  async remove(id: string) {
    const remove = await this.database.products.delete({
      where: {
        id,
      },
    });
    return  { data: remove , message: 'successfully deleted' , success: true };
  }
}
