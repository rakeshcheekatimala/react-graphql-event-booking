import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// the timestamp attribute creates two attributes createdAt and updatedAt for the document

const booking = mongoose.model('Booking', bookingSchema);

export default booking;
