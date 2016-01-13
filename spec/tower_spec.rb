require 'rspec'
require 'towers.rb'

 describe Tower do

   let(:tower) { Tower.new }

   describe "#won?" do
      it "tower is on different peg" do
        tower.board = [[], [3,2,1], []]
        expect(tower.won?).to be_truthy
      end
   end

   describe "#move" do

      it "moves to a different peg" do
        tower.board = [[3,2,1], [], []]
        tower.move(0, 1)
        expect(tower.board).to eq([[3,2], [1], []])
      end

      it "prevents bigger disk from being on smaller disk" do
        tower.board = [[3,2], [1], []]
        expect(tower.move(0,1)).to raise_error(RuntimeError)
      end

   end

   describe "#render" do
      it "displays correctly" do
        expect(tower).to receive(:puts)#.with("  ")
        tower.render
      end
   end
 end
