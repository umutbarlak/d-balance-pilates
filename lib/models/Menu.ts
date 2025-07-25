import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem {
  label: string;
  href: string;
  children?: IMenuItem[];
}

export interface IMenu extends Document {
  name: string;
  items: IMenuItem[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema: Schema = new Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
  children: [{ type: Schema.Types.Mixed }],
});

const MenuSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  items: [MenuItemSchema],
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default mongoose.models.Menu || mongoose.model<IMenu>('Menu', MenuSchema);