/**
 * A variable that may manipulate how a conversation will flow
 */
class ConversationVariable
{
    constructor(name, value)
    {
        this.m_name = name;
        this.m_value = value;
    }

    // Accessors
    get name() { return this.m_name; }
    get value() { return this.m_value; }
}

module.exports = ConversationVariable;