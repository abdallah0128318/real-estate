import React from 'react'

const CreateListing = () => {
  return (
    <main className='mx-auto mt-6 sm:w-3/4'>
      <h1 className='font-bold text-3xl text-center my-4'>Create a Listing</h1>
      {/* here is the main div that has two divs left and right */}
      <form className="flex flex-col p-6 md:flex-row sm:gap-5">

        {/* here is the left div or the left section */}
        <div className="flex-1">

          {/* ********************************************************************************/}
          {/* here is the inputs div */}
          <div className="flex flex-col">
            {/* here is the name input field */}
            <div>
              <input type="text" name="name" id="name" placeholder='Name' className='w-full p-4 rounded-lg border' required/>
            </div>
            {/* here is the description field */}
            <div>
              <textarea placeholder='description' rows="3" className='rounded-lg p-4 w-full mt-3 border' required></textarea>
            </div>
            {/* here is the address field */}
            <div><input type="text" name="address" id="address" placeholder='address' className="border rounded-lg p-4 w-full mt-1" required/></div>
          </div>

        {/* ********************************************************************************/}
           {/* here is the checkboxs div */}
        <div className="flex flex-wrap gap-3 mt-9">
          {/* here is the Sell checkbox */}
          <div className='flex gap-2'>
            <input type="checkbox" name="sell" id="sell" className='w-5' />
            <label htmlFor="sell">Sell</label>
          </div>
          {/* here is the rent checkbox */}
          <div className='flex gap-2'>
            <input type="checkbox" name="rent" id="rent" className='w-5' />
            <label htmlFor="rent">Rent</label>
          </div>
          {/* here is the parking checkbox */}
          <div className='flex gap-2'>
            <input type="checkbox" name="parking" id="parking" className='w-5' />
            <label htmlFor="parking">Parking</label>
          </div>
          {/* here is the furnished checkbox */}
          <div className='flex gap-2'>
            <input type="checkbox" name="furnished" id="furnished" className='w-5' />
            <label htmlFor="furnished">Furnished</label>
          </div>
          {/* here is the offer checkbox */}
          <div className='flex gap-2'>
            <input type="checkbox" name="offer" id="offer"  className='w-5'/>
            <label htmlFor="offer">Offer</label>
          </div>
        </div>

        {/* ********************************************************************************/}
        {/* here the bedrooms, bathrooms, regularPrice and discountPrice divs */}
        <div className="flex flex-wrap mt-9 gap-4">

          {/* here is the beds number input */}
          <div className='flex gap-3 items-center'>
            <input 
            type="number" name="beds" min="1" max="10" id="beds" required
            className='rounded-lg p-4 border'
            value={1}
            /> 
            <label htmlFor="beds" className='text-lg'>Beds</label>
          </div> 

          {/* here is the bathrooms number input */}
          <div className='flex gap-3 items-center'>
            <input 
            type="number" name="bathrooms" min="1" max="10" id="bathrooms" required
            className='rounded-lg p-4 border'
            value={1}
            /> 
            <label htmlFor="bathrooms" className='text-lg'>bathrooms</label>
          </div>

          {/* here is the regularPrice input */}
          <div className='flex gap-3 items-center'>
            <input 
            type="number" name="regularPrice" min="1" max="10" id="regularPrice" required
            className='rounded-lg p-4 border'
            value={50}
            />
            <div className="flex flex-col">
              <label htmlFor="regularPrice" className='text-lg'>RegularPrice</label>
              <span className='text-sm'>($ / month)</span>
            </div>
          </div>

          {/* here is the discountPrice input */}
          <div className='flex gap-3 items-center'>
            <input 
            type="number" name="discountPrice" min="1" max="10" id="discountPrice" required
            className='rounded-lg p-4 border'
            value={50}
            /> 
             <div className="flex flex-col">
              <label htmlFor="discountPrice" className='text-lg'>DiscountPrice</label>
              <span className='text-sm' >($ / month)</span>
            </div>
          </div>

        </div>

      </div>

      {/* *********************** The left side ended :) *******************/}



        {/* here is the right div or the right section */}
        <div className="flex-1">

          <div className='mt-5'>
              <span className='font-semibold'>images:</span>
              <span className='text-gray-600'> The first image will be the cover (max 6)</span>
          </div>

          <div className='flex gap-3 mt-4'>
            <div className='border border-gray-500 p-3 w-full rounded'>
              <input type="file" name="images" id="images" className='w-full rounded' multiple />
            </div>
            <button type='button' className='uppercase text-green-700 border border-green-500 p-3 rounded'>Upload</button>
          </div>


          <button type="submit" className='uppercase rounded-lg bg-slate-900 hover:opacity-80 text-white w-full mt-3 p-3'>Creare Listing</button>

        </div>
      </form>
    </main>
  )
}

export default CreateListing