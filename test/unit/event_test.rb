# == Schema Information
#
# Table name: events
#
#  id            :integer         not null, primary key
#  date          :date
#  start         :time
#  room_id       :integer
#  title         :string(255)
#  subtitle      :string(255)
#  track         :string(255)
#  type          :string(255)
#  language      :string(255)
#  abstract      :text
#  created_at    :datetime
#  updated_at    :datetime
#  conference_id :integer
#  start_time    :datetime
#  end_time      :datetime
#  duration      :integer
#

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end
