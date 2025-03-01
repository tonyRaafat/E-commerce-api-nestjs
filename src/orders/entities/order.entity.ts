import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { OrderStatus } from '../dto/update-order.dto';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop([
    {
      product: { type: SchemaTypes.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ])
  items: Array<{
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }>;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: OrderStatus.PENDING, enum: Object.values(OrderStatus) })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
