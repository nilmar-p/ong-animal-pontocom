import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { OrderThriftEntity } from "./entities/order-thrift";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateOrderThriftDto } from "./dto/update-order-thrift.dto";
import { CreateOrderThriftDto } from "./dto/create-order-thrift.dto";
import { ORDER_SELECT } from "./order.select";
import { ProductThriftEntity } from "src/product-thrift-store/entities/product-thrift";

@Injectable()
export class OrderThriftService {
    constructor(
        @InjectRepository(OrderThriftEntity)
        private readonly orderRepository: Repository<OrderThriftEntity>,

        @InjectRepository(ProductThriftEntity)
        private readonly productRepository: Repository<ProductThriftEntity>,
    ) { }

    async getAll(pagination: PaginationDto) {
        const { limit = 10, offset = 0 } = pagination;

        const orders = await this.orderRepository.find({
            take: limit,
            skip: offset,
            relations: ['product'],
            select: ORDER_SELECT.BASIC
        });

        return orders;
    }

    async getOne(id: number) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['product'],
            select: ORDER_SELECT.FULL
        })

        if (!order) throw new NotFoundException('Pedido não encontrado')

        return order;
    }

    async create(body: CreateOrderThriftDto) {
        const product = await this.getOne(body.productId)

        const newOrder = {
            interested: body.interested,
            phone: body.phone,
            product,
            price: product.price
        };

        const order = this.orderRepository.create(newOrder);

        return await this.orderRepository.save(order);
    }

    async update(id: number, body: UpdateOrderThriftDto) {
        const order = await this.getOne(id);

        const updatedOrder = this.orderRepository.merge(order, body);

        return await this.orderRepository.save(updatedOrder);
    }

    async delete(id: number) {
        const order = await this.getOne(id);

        return await this.orderRepository.remove(order);
    }
}