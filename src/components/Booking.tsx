import SectionHeading from "./SectionHeading";
import FlexSection from "./FlexSection";
import bookingImage from "../assets/booking.svg";
import Image from "next/image";
import twclsx from "@/utils/twclsx";

const Booking = () => (
	<FlexSection id="booking">
		<SectionHeading
			className="mb-20"
			direction="left"
			title={
				<>
					Daftar untuk konsultasi{" "}
					<span className="text-[2.6rem] font-bold">hari ini</span>
				</>
			}
			subtitle={
				<>
					Kami menunggu <span className="text-accent">Anda</span>
				</>
			}
		/>
		<div className="flex-1 hidden lg:block">
			<Image className="w-full" src={bookingImage} alt="booking" />
		</div>
		<div className="flex-1">
			<form className="w-full flex flex-col gap-6">
				<div className="flex flex-col lg:flex-row gap-6">
					<input
						className="flex-1 px-6 py-3 border border-[#F88379] placeholder:text-[#F88379] rounded-lg"
						placeholder="Nama dan Nama Belakang..."
						type="text"
					/>
					<input
						className="flex-1 px-6 py-3 border border-[#F88379] placeholder:text-[#F88379] rounded-lg"
						placeholder="Nomor Telepon..."
						type="number"
					/>
				</div>
				<textarea
					className="min-h-[15rem] px-6 py-3 border border-[#F88379] placeholder:text-[#F88379] rounded-lg"
					placeholder="Informasi tambahan..."
				/>
				<button
					className={twclsx(
						"px-8 py-4 rounded-lg select-none text-white bg-accent hover:opacity-80",
						"transition duration-150"
					)}
				>
					Kirim Permohonan
				</button>
			</form>
		</div>
	</FlexSection>
);

export default Booking;
