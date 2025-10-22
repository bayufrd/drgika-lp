"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import FlexSection from "./FlexSection";
import Image from "next/image";
import React, { Fragment } from "react";
import {
  LuCalendar,
  LuPhone,
  LuMessageSquare
} from "react-icons/lu";
import twclsx from "@/utils/twclsx";
import Data from "public/data/data.json";

// Helper function to map icon names to actual icons
const getIconByName = (iconName: string, className?: string) => {
  switch (iconName) {
    case 'LuCalendar':
      return <LuCalendar className={className} />;
    case 'LuPhone':
      return <LuPhone className={className} />;
    case 'LuMessageSquare':
      return <LuMessageSquare className={className} />;
    default:
      return null;
  }
};

const BookingItem = ({
  icon,
  title,
  description,
  number
}: {
  icon: React.ReactNode,
  title: string,
  description: string,
  number: number
}) => (
  <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group">
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">
      {number}
    </div>
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-pink-500 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const Booking = () => {
  const { booking } = Data;
  const [formData, setFormData] = useState({
    nama: '',
    usia: '',
    jenisKelamin: '',
    tanggal: '',
    jam: '',
    tambahan: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const template = booking.templatePesan;

    const renderTemplate = (template: string, data: typeof formData) => {
      return template.replace(/{{(\w+)}}/g, (match, key) => {
        return data[key as keyof typeof formData] || match;
      });
    };

    const message = renderTemplate(template, formData);

    const encodedMessage = encodeURIComponent(message);

    const phoneNumber = Data.booking.phoneNumber;

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <FlexSection
      sectionClassName="py-16 bg-white relative"
      wrapperClassName="lg:flex-col lg:items-start xl:flex-row xl:items-center"
      id="booking"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">
            {booking.mainTitle.text} <span className="text-pink-500">{booking.mainTitle.highlight}</span>{booking.mainTitle.afterHighlight}
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            {booking.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 hidden lg:block">
            <Image
              className="w-full animate-float"
              src={booking.bookingImage}
              alt="booking"
              width={500}
              height={500}
            />
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {booking.bookingSteps.map((step) => (
                <BookingItem
                  key={step.number}
                  number={step.number}
                  icon={
                    getIconByName(
                      step.icon,
                      "w-12 h-12 text-pink-500 group-hover:text-pink-600 transition-colors"
                    )
                  }
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <input
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="flex-1 px-6 py-3 border border-pink-500 placeholder:text-pink-500 rounded-lg focus:ring-2 focus:ring-pink-300 transition"
                  placeholder={booking.formFields.nama.placeholder}
                  type={booking.formFields.nama.type}
                  required={booking.formFields.nama.required}
                  title="Nama harus diisi"
                />
                <input
                  name="usia"
                  value={formData.usia}
                  onChange={handleChange}
                  className="flex-1 px-6 py-3 border border-pink-500 placeholder:text-pink-500 rounded-lg focus:ring-2 focus:ring-pink-300 transition"
                  placeholder={booking.formFields.usia.placeholder}
                  type={booking.formFields.usia.type}
                  required={booking.formFields.usia.required}
                  min={booking.formFields.usia.min}
                  max={booking.formFields.usia.max}
                  title="Usia harus diisi antara 0-120"
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                <select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleChange}
                  className="flex-1 px-6 py-3 border border-pink-500 text-pink-500 rounded-lg focus:ring-2 focus:ring-pink-300 transition"
                  required
                  title="Jenis kelamin harus dipilih"
                >
                  {booking.formFields.jenisKelamin.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="flex-1 px-6 py-3 border border-pink-500 text-pink-500 rounded-lg focus:ring-2 focus:ring-pink-300 transition"
                  type={booking.formFields.tanggal.type}
                  required={booking.formFields.tanggal.required}
                  title="Tanggal harus dipilih"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                <select
                  name="jam"
                  value={formData.jam}
                  onChange={handleChange}
                  className="flex-1 px-6 py-3 border border-pink-500 text-pink-500 rounded-lg focus:ring-2 focus:ring-pink-300 transition"
                  required={booking.formFields.jam.required}
                  title="Jam harus dipilih"
                >
                  <option value="">Pilih Jam</option>
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, "0");
                    return (
                      <React.Fragment key={hour}>
                        <option value={`${hour}:00`}>{hour}:00</option>
                        <option value={`${hour}:30`}>{hour}:30</option>
                      </React.Fragment>
                    );
                  })}
                </select>
              </div>

              <textarea
                name="tambahan"
                value={formData.tambahan}
                onChange={handleChange}
                className="min-h-[5rem] px-6 py-3 border border-pink-500 placeholder:text-pink-500 rounded-lg focus:ring-2 focus:ring-pink-300 transition"
                placeholder={booking.formFields.tambahan.placeholder}
                required={booking.formFields.tambahan.required}
                title="Informasi tambahan harus diisi"
              />
              <button
                type="submit"
                className={twclsx(
                  "px-8 py-4 rounded-lg select-none text-white bg-pink-500 hover:bg-pink-600",
                  "transition duration-150 ease-in-out transform hover:scale-105"
                )}
              >
                {booking.submitButton.text}
              </button>
            </form>
          </div>
        </div>
      </div>
    </FlexSection>
  );
};

export default Booking;