require 'rspec'
require 'exercises.rb'

 describe Array do
   subject(:array) {[1, 2, 1, 3, 3]}
   subject(:uniq_array) {array.my_uniq}
   before(:each) do
     array.my_uniq
   end

   describe "#my_uniq" do
     it "returns a new array" do
       expect(uniq_array).to_not eq(array)
     end

     it "removes duplicates" do
        expect(uniq_array).to eq([1,2,3])
     end

     it "returns elements in order in which they first appeared"
     it "does not mutate the original array"
   end
 end
